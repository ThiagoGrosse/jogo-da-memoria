import { GridItemType } from '@/types/gridItemType';
import * as C from './styles';
import Image from 'next/image';
import { items } from '@/data/items';

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export const GridItem = ({ item, onClick }: Props) => {

    return (
        <C.Container
            showBackground={item.permanentShown || item.shown}
            onClick={onClick}>
            {item.permanentShown === false && item.shown === false && (
                <Image src="/svgs/b7.svg" width={40} height={40} alt="Icon" />
            )}
            {(item.permanentShown || item.shown) && item.item !== null && (
                <Image src={items[item.item].icon} width={40} height={40} alt="Icon" />
            )}
        </C.Container>
    )
}