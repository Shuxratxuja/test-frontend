'use client'
import Container from "@/components/container/Container";
import CardComponent from "@/components/card/CardComponent";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import Man from "../../public/ManImg.png";
import { type PricingCard } from "@/types/pricing";
import { instance } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { AnimatedButton } from "@/components/ui/animated-button";
import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { useTimer } from "@/hooks/useTimer";
import { useState } from "react";

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<PricingCard | null>(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const { data } = useQuery<{ data: PricingCard[] }>({
    queryKey: ['pricing'],
    queryFn: () => instance.get('')
  })

  const pricing = data?.data || [];

  const { formattedTime, isWarning, isExpired } = useTimer({
    initialMinutes: 2,
    onTimeUp: () => {
      console.log('Timer expired - discounts removed');
    }
  });

  const handleCardSelect = (card: PricingCard) => {
    setSelectedCard(card);
  };

  const handleBuyClick = () => {
    if (!isCheckboxChecked) {
      setCheckboxError(true);
      setTimeout(() => setCheckboxError(false), 3000);
      return;
    }

    if (selectedCard) {
      console.log('Buying:', selectedCard);
      // Здесь можно добавить логику покупки
    }
  };

  return (
    <>
      <header className="bg-[#1D5B43] sticky top-0 z-50 py-4 px-4 w-full">
        <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl text-center mb-2">
          Успейте открыть пробную неделю
        </p>
        <div className={`flex justify-center items-center gap-2 ${isWarning ? 'text-red-500 animate-pulse' : 'text-[#FFBB00]'
          }`}>
          <Sparkle className={`fill-current ${isWarning ? 'animate-pulse' : ''}`} size={12} />
          <p className={`font-bold text-2xl sm:text-3xl md:text-[40px] ${isWarning ? 'animate-pulse' : ''}`}>
            {formattedTime}
          </p>
          <Sparkle className={`fill-current ${isWarning ? 'animate-pulse' : ''}`} size={12} />
        </div>
      </header>
      <main>
        <Container>
          <p className="text-white mt-8 sm:mt-12 md:mt-[50px] font-bold text-2xl sm:text-3xl md:text-[40px] text-center md:text-left">
            Выбери подходящий для себя <span className="text-mainColor">тариф</span>
          </p>

          {/* Pricing Cards */}
          <div className="flex flex-col lg:flex-row mt-8 sm:mt-16 md:mt-[110px] gap-8 lg:gap-[87px] items-center lg:items-start">
            {/* Man Image - Responsive sizing */}
            <div className="flex justify-center lg:justify-start w-full lg:w-auto">
              <div className="relative w-[99px] h-[200px] sm:w-[121px] sm:h-[250px] md:w-[330px] md:h-[550px] lg:w-[380px] lg:h-[767px] mt-[52px]">
                <Image
                  src={Man}
                  alt="man"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>


            <div className="w-full lg:w-[748px]">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-[14px]">
                {/* Best Option */}
                <div>
                  {pricing.filter(card => card.is_best).map(card => (
                    <CardComponent
                      key={card.id}
                      card={card}
                      onSelect={() => handleCardSelect(card)}
                      showDiscount={!isExpired}
                    />
                  ))}
                </div>

                {/* Other Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-[14px]">
                  {pricing.filter(card => !card.is_best).map(card => (
                    <CardComponent
                      key={card.id}
                      card={card}
                      onSelect={() => handleCardSelect(card)}
                      showDiscount={!isExpired}
                    />
                  ))}
                </div>
              </div>
              <div className="text-white flex gap-2 mt-5 bg-bgColor rounded-[20px] px-3 sm:px-5 py-4 sm:py-[18px] w-full sm:w-fit">
                <span className="text-mainColor text-lg sm:text-[24px] px-1 sm:px-[10px]">!</span>
                <p className="text-sm sm:text-base">
                  Следуя плану на 3 месяца и более, люди получают <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>в 2 раза лучший результат, чем за 1 месяц
                </p>
              </div>
              <div className={`flex gap-3 mt-6 items-center sm:mt-[30px] text-[#CDCDCD] transition-all duration-300 ${checkboxError ? 'animate-pulse-red' : ''
                }`}>
                <CustomCheckbox
                  checked={isCheckboxChecked}
                  onChange={setIsCheckboxChecked}
                  error={checkboxError}
                />
                <p className="text-sm sm:text-base leading-relaxed">
                  Я согласен с <a href="#" className="underline underline-offset-2">офертой рекуррентных платежей</a> и <a href="#" className="underline underline-offset-2 ">Политикой <br className="hidden sm:block" /> конфиденциальности</a>
                </p>
              </div>
              <AnimatedButton
                onClick={handleBuyClick}
                className="mt-4 w-full sm:w-auto bg-mainColor text-black px-8 sm:px-[137px] py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-[20px]"
              >
                Купить
              </AnimatedButton>
              <p className="text-xs sm:text-sm text-desc w-full sm:w-[748px] mt-3 sm:mt-[14px] leading-relaxed">
                Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
              </p>
            </div>


          </div>
          <div className="border border-borderColor p-4 sm:p-5 rounded-[30px] mt-8 sm:mt-16 md:mt-[66px] mb-[150px]">
            <div className="border border-[#81FE95] text-[#81FE95] px-4 sm:px-[30px] py-3 sm:py-4 rounded-[30px] w-fit text-lg sm:text-xl md:text-[28px] font-medium">
              гарантия возврата 30 дней
            </div>
            <p className="text-base sm:text-lg md:text-2xl text-[#DCDCDC] mt-4 sm:mt-6 md:mt-[30px] leading-relaxed">
              Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
            </p>
          </div>
        </Container>
      </main>
    </>
  );
}
