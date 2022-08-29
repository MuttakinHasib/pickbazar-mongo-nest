import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export enum QueryTypesOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}

export class GetTypesDto extends PaginationArgs {
  @IsEnum(QueryTypesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryTypesOrderByColumn })
  @IsOptional()
  orderBy?: QueryTypesOrderByColumn = QueryTypesOrderByColumn.NAME;
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.ASC;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
}
