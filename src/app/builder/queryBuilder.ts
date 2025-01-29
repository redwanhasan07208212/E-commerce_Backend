import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  public page: number;
  public limit: number;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
    this.page = Number(query.page) || 1;
    this.limit = Number(query.limit) || 10;
  }

  search(searchableMethods: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableMethods.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt|in)\b/g,
      (match) => `$${match}`,
    );

    this.modelQuery = this.modelQuery.find(
      JSON.parse(queryStr) as FilterQuery<T>,
    );
    return this;
  }

  sort() {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder = this.query.sortOrder === 'asc' ? '' : '-';
    const sort = sortBy
      .split(',')
      .map((field) => `${sortOrder}${field}`)
      .join(' ');

    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  getCountQuery() {
    const baseQuery = this.modelQuery.getQuery();
    return this.modelQuery.model.countDocuments(baseQuery);
  }

  getPaginationInfo() {
    return {
      page: this.page,
      limit: this.limit,
    };
  }
}

export default QueryBuilder;
