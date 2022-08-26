import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { CreateReviewDto } from './create-review.dto';

export enum QueryCategoriesOrderByColumn {
  CREATED_AT = 'createdAt',
  COMMENT = 'comment',
  NEGATIVE_FEEDBACK = 'negative_feedbacks_count',
  POSITIVE_FEEDBACK = 'positive_feedbacks_count',
  UPDATED_AT = 'updatedAt',
}

export class GetReviewsDto extends PartialType(
  OmitType(CreateReviewDto, ['feedbacks', 'photos']),
) {
  @IsString()
  @ApiPropertyOptional({ enum: QueryCategoriesOrderByColumn })
  @IsOptional()
  orderBy?: QueryCategoriesOrderByColumn =
    QueryCategoriesOrderByColumn.CREATED_AT;
  @IsString()
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.ASC;
  @IsOptional()
  @ApiPropertyOptional()
  @Transform((val) => parseInt(val.value))
  limit?: number = 15;
  @IsOptional()
  @ApiPropertyOptional()
  @Transform((val) => parseInt(val.value))
  page?: number = 1;
}
