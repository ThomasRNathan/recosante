import { View } from 'react-native';
import { Indicator } from '~/types/indicator';
import MyText from '../ui/my-text';
import { IndicatorService } from '~/services/indicator';
import dayjs from 'dayjs';
import useMunicipality from '~/zustand/municipality/useMunicipality';
import { cn } from '~/utils/tailwind';
import { Info } from '~/assets/icons/info';
import { LineChart } from './graphs/line';

interface IndicatorPreviewProps {
  indicator: Indicator;
  isFavorite?: boolean;
}
export function IndicatorPreview(props: IndicatorPreviewProps) {
  const { municipality } = useMunicipality((state) => state);
  return (
    <View
      className={cn(
        '   mx-auto my-5 basis-[47%]  rounded-2xl bg-white p-2 ',
        `${props.isFavorite ? 'border-app-green mx-2 -mt-2 border-[3px]' : ''}
    }`,
      )}
    >
      <View className="flex flex-row justify-between">
        <View className=" flex w-full justify-center">
          <View className=" bg-app-green  -top-6 mx-auto  items-center rounded-full px-6 py-1">
            <MyText font="MarianneBold" className="uppercase">
              Moyen
            </MyText>
          </View>
          <View className="-top-6 flex items-end">
            <Info />
          </View>

          <MyText
            className="text-wrap text-md uppercase text-black"
            font="MarianneBold"
          >
            {props.indicator.name}
          </MyText>
          <MyText
            className=" mb-4 text-xs uppercase text-gray-500"
            font="MarianneRegular"
          >
            {municipality?.nom} {municipality?.codesPostaux[0]} -{' '}
            {dayjs().format('DD/MM')}
          </MyText>
          <LineChart />
          <MyText className="mt-4 text-xs">
            {IndicatorService.getDescriptionBySlug(props.indicator.slug)}
          </MyText>
        </View>
      </View>
    </View>
  );
}