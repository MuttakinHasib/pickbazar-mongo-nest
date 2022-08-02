import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon, CouponSchema } from './schemas/coupon.shema';
import { GetCouponsDto } from './dto/get-coupons.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, PaginateModel } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupon.name)
    private couponModel: PaginateModel<CouponSchema>,
  ) {}
  async create(createCouponDto: CreateCouponDto) {
    return await this.couponModel.create(createCouponDto);
  }

  async getCoupons({ search, limit, page }: GetCouponsDto) {
    const response = await this.couponModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      { limit, page },
    );
    return PaginationResponse(response);
  }

  async getCoupon(id: ObjectId | string) {
    return this.couponModel.findById(id);
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    return await this.couponModel.findByIdAndUpdate(
      id,
      { $set: updateCouponDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.couponModel.findByIdAndRemove(id, { new: true });
  }
}
