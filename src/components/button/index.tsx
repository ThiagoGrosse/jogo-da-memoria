import * as C from './styles';
import Image from 'next/image';


type Props = {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({ label, icon, onClick }: Props) => {

    return (
        <C.Container onClick={onClick}>
            {icon && (
                <C.IconArea>
                    <Image src={icon} width={20} height={20} alt="Icon to Button" />
                </C.IconArea>
            )}
            <C.Label>{label}</C.Label>
        </C.Container>
    )
}