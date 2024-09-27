import React from 'react';
import { useForm } from 'react-hook-form';
import InputFeild from './InputFeild';

const Priceing = ({ register }) => {


    return (
        <div className="bg-white border-primary rounded-[10px] text-[.9375rem] p-5 mt-6">
            <h1 className="text-[1.125rem] font-medium mb-5 ">
                Pricing
            </h1>
            <div className="flex gap-4">
                <div className="flex-1">
                    <InputFeild type={'number'} require={true} label={'Product Price :'} name={'Product_Price'} register={register} />
                </div>

                <div className="flex-1">
                    <InputFeild type={'number'} label={'Discount'} name={'Discount'} register={register} />
                </div>
            </div>
        </div>
    );
};

export default Priceing;