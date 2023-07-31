import React from 'react'
import allpay from '../assets/allpay.webp'

const Footer = () => {
  return (
    <div className='px-5 flex flex-col mt-10 justify-center items-center'>
        <div className='grid grid-cols-4 gap-4'>
            <div className='flex flex-col'>
                <span className='text-[14px] text-gray-600'>Chính sách bảo hành</span>
                <span className='text-[14px] text-gray-600'>Mua hàng trả góp</span>
                <span className='text-[14px] text-gray-600'>Chính sách mua hàng Online</span>
                <span className='text-[14px] text-gray-600'>Chính sách bảo mật thông tin</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-[14px] text-gray-600'>Chính Sách Vận Chuyển, Thanh Toán</span>
                <span className='text-[14px] text-gray-600'>Chính Sách Bảo Mật Thông Tin</span>
                <span className='text-[14px] text-gray-600'>Chính Sách & Quy Định Chung</span>
                <span className='text-[14px] text-gray-600'>Chính Sách Bảo Hành, Đổi, Trả Hàng</span>
                <span className='text-[14px] text-gray-600'>Khách Hàng Thân Thiết</span>
            </div>
            <div>
                <div className='flex items-center justify-center flex-col'>
                    <h3 className='font-semibold text-gray-600'>Ứng dụng của chúng tôi</h3>
                    <div className='grid grid-cols-3 gap-2'>
                        <img className='w-[80px] my-3' src="https://static.chotot.com/storage/default/ios.svg" alt="" />
                        <img className='w-[80px] my-3' src="https://static.chotot.com/storage/default/android.svg" alt="" />
                        <img className='w-[80px] my-3' src="https://static.chotot.com/storage/default/huawei_app_install.webp" alt="" />
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h3 className='font-semibold text-gray-600'>Hình thức thanh toán</h3>
                <img className='w-[200px] mt-2' src={allpay} alt='pay'></img>
                <div className='my-2 py-1 bg-opacity-90 justify-center flex flex-col items-center px-5 rounded-md bg-[rgb(255,0,29)]'>
                    <h3 className='font-semibold text-gray-100 text-[13px]'>Hotline phản ánh chất lượng</h3>
                    <span className='text-[22px] font-semibold text-gray-100'>0363073476</span>
                </div>
            </div>
        </div>
        <div className='my-3'>
            <p className='text-gray-400'>Công ty TNHH Mạnh Tuấn Mobile do sở KH & ĐT TP. HCM</p>
        </div>
    </div>
  )
}

export default Footer