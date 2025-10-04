
import { PricingCard } from "@/types/pricing";
import { cn } from "@/lib/utils";

interface CardComponentProps {
    card: PricingCard;
    isSelected?: boolean;
    onSelect?: () => void;
    showDiscount?: boolean;
}

const CardComponent = ({
    card,
    onSelect,
    showDiscount = true
}: CardComponentProps) => {
    const discount = Math.round(((card.full_price - card.price) / card.full_price) * 100);

    return (
        <div
            className={cn(
                "relative bg-bgColor rounded-[34px] cursor-pointer transition-all duration-300 hover:scale-105",
                card.is_best
                    ? 'border-2 border-mainColor pl-4 sm:pl-8 md:pl-[122px] pr-4 sm:pr-6 md:pr-[80px] py-7 md:py-[30px]'
                    : 'border-2 border-borderColor px-3 sm:px-4 md:px-[18px] pt-8 sm:pt-12 md:pt-[70px] pb-3 sm:pb-4 md:pb-[23px]',
            )}
            onClick={onSelect}
        >
            {/* Discount Badge */}
            <div className={`${cn(
                "absolute w-fit top-0 md:left-12 bg-[#FD5656] text-white sm:text-sm md:text-[22px] font-medium px-1 sm:px-2 py-[3px] sm:py-[5px] rounded-b-[6px] sm:rounded-b-[8px] transition-all duration-500",
                showDiscount ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )} ${card.is_best ?'right-15' :'right-7'} `}>
                -{discount}%
            </div>

            {/* Best Badge */}
            {card.is_best && (
                <div className="absolute  right-4 sm:right-2 top-1 text-mainColor text-sm sm:text-lg md:text-[22px] font-medium px-1 sm:px-2 py-1 rounded-lg">
                    ХИТ!
                </div>
            )}


            <div className={`flex items-center justify-between md:flex-col ${card.is_best ? 'grid grid-cols-2' : ''}`}>
                <div>
                    {/* Period */}
                    <h3 className={`text-white text-lg md:text-[26px] font-medium pl-2 sm:pl-4 md:pl-[25px] ${card.is_best ? 'md:mb-4' : ' md:mb-[30px]'}`}>
                        {card.period}
                    </h3>
                    {/* Price */}
                    <div className="pl-2 sm:pl-4 md:pl-[18px]">
                        <div className={cn(
                            "flex flex-col items-start min-h-[60px] sm:min-h-[80px] md:min-h-[90px] justify-center",
                        )}>
                            <div className={cn(
                                "text-[34px] md:text-[50px] font-semibold leading-[100%] transition-all duration-500",
                                card.is_best ? 'text-mainColor' : 'text-white'
                            )}>
                                {showDiscount ? card.price.toLocaleString() : card.full_price.toLocaleString()} ₽
                            </div>
                            {showDiscount && (
                                <div className={`text-grayColor text-sm sm:text-lg md:text-2xl leading-[120%] line-through ${card.is_best ? 'pl-[70px] sm:pl-[60px] md:pl-[90px]' : 'pl-[45px] sm:pl-[40px] md:pl-[55px]'}`}>
                                    {card.full_price.toLocaleString()} ₽
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Description */}
                <p className="text-gray-300 w-[102px] md:w-full line-clamp-3 text-sm leading-relaxed mt-2 sm:mt-3 md:mt-4">
                    {card.text}
                </p>
            </div>
        </div>
    );
};

export default CardComponent;