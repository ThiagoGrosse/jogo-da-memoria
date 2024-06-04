"use client"
import { InfoItem } from '@/components/InfoItem';
import * as C from './app.styles'
import Image from 'next/image';
import { Button } from '@/components/button';
import { useEffect, useState } from 'react';
import { GridItemType } from '@/types/gridItemType';
import { items } from '@/data/items';
import { GridItem } from '@/components/gridItem';
import { formatTimeElapsed } from '@/helpers/formatTimeElapsed';

export default function Home() {
    const [playing, setPlaying] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [moveCount, setMoveCount] = useState<number>(0);
    const [shownCount, setShownCount] = useState<number>(0);
    const [gridItems, setGridItems] = useState<GridItemType[]>([]);

    useEffect(() => resetAndCreateGrid(), []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (playing) setTimeElapsed(timeElapsed + 1);
        }, 1000);
        return () => clearInterval(timer)
    }, [playing, timeElapsed]);

    useEffect(() => {
        if (shownCount === 2) {
            let opened = gridItems.filter(item => item.shown === true);
            if (opened.length === 2) {

                if (opened[0].item === opened[1].item) {
                    let tmpGrid = [...gridItems];
                    for (let i in tmpGrid) {
                        if (tmpGrid[i].shown) {
                            tmpGrid[i].permanentShown = true;
                            tmpGrid[i].shown = false;
                        }
                    }
                    setGridItems(tmpGrid);
                    setShownCount(0);
                } else {
                    setTimeout(() => {
                        let tmpGrid = [...gridItems];
                        for (let i in tmpGrid) {
                            tmpGrid[i].shown = false;
                        }
                        setGridItems(tmpGrid);
                        setShownCount(0);
                    }, 1000)
                }


                setMoveCount(moveCount => moveCount + 1);
            }
        }
    }, [shownCount, gridItems])

    useEffect(() => {
        if (moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
            setPlaying(false);
        }
    }, [moveCount, gridItems]);

    const resetAndCreateGrid = () => {

        // Zerar informações
        setTimeElapsed(0);
        setMoveCount(0);
        setShownCount(0);

        // Criar grid de cartas
        let tmpGrid: GridItemType[] = [];

        for (let i = 0; i < items.length * 2; i++) {
            tmpGrid.push({
                item: null,
                shown: false,
                permanentShown: false
            });
        }

        // Preencher o grid
        for (let w = 0; w < 2; w++) {
            for (let n = 0; n < items.length; n++) {
                let pos = -1;
                while (pos < 0 || tmpGrid[pos].item !== null) {
                    pos = Math.floor(Math.random() * (items.length * 2));
                }
                tmpGrid[pos].item = n;
            }
        }

        // Salvar no state
        setGridItems(tmpGrid);

        // Começar o jogo
        setPlaying(true);
    }

    const handleIitemClick = (index: number) => {
        if (playing && index !== null && shownCount < 2) {
            let tmpGrid = [...gridItems];
            if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown == false) {
                tmpGrid[index].shown = true;
                setShownCount(shownCount + 1);
            }
            setGridItems(tmpGrid);
        }
    }

    return (
        <main>
            <C.Container>
                <C.Info>
                    <C.LogoLink href="">
                        <Image src="/assets/devmemory_logo.png" width={200} height={40} alt='Logo' />
                    </C.LogoLink>
                    <C.InfoArea>
                        <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
                        <InfoItem label="Movimentos" value={moveCount.toString()} />
                    </C.InfoArea>
                    <Button label="Reiniciar" icon="/svgs/restart.svg" onClick={resetAndCreateGrid}></Button>
                </C.Info>
                <C.GridArea>
                    <C.Grid>
                        {gridItems.map((item, index) => (
                            <GridItem
                                key={index}
                                item={item}
                                onClick={() => handleIitemClick(index)}
                            />
                        ))}
                    </C.Grid>
                </C.GridArea>
            </C.Container>
        </main>
    );
}
