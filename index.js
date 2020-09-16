window.addEventListener('load', function (){
    let masonryWrapper = document.getElementById('myMasonry');
    if(!masonryWrapper) return ;

    let allItems = masonryWrapper.children,
        rowSize = 10,
        rowGap = parseInt(getComputedStyle(masonryWrapper).rowGap),
        columnGap = parseInt(getComputedStyle(masonryWrapper).columnGap),
        itemWidth = Number(allItems[0].offsetWidth ),
        wrapperWidth = Number(masonryWrapper.offsetWidth),
        countColomn = Math.ceil(wrapperWidth / (itemWidth+columnGap)),
        fullRowSize = rowSize + rowGap,
        rowCount = Math.ceil(masonryWrapper.offsetHeight / fullRowSize),
        map = [];

        for (let row = 0; row < Math.ceil(allItems.length / countColomn); row++){
            let currentRow = [];
            for (let col = 0; col < countColomn; col++ ){
                let el = allItems[row * countColomn + col];
                currentRow.push({
                    el,
                    rowBussy: el ? Math.ceil(el.offsetHeight / fullRowSize) : 0

                });
            }
            map.push(currentRow);
        }


        // for (let row = 0; row < Math.ceil(allItems.length / countColomn); row++){
        //     currentRowSort= [];
        //     map.push([]);
        //     for (let col = 0; col < countColomn; col++ ){
        //                 $el: false,
        //                 rowBusy: 0
        //             });
        //             continue;
        //         };
        //         currentRowSort.push({
        //             $el: $(el),
        //             rowBusy: Math.ceil($(el).height() / fullRowSize)
        //         });
        //     }
        //     if (currentRowSort.length) createRow(row);
            
           
        //     setGridParams(map[row], row);
            
        // };



        function createRow(row) {
            let predRow = map[row-1].map((el, ind)=>({bussyAll: el.bussyAll, ind}));
            
            currentRowSort.sort((e1, e2)=> e2.rowBusy - e1.rowBusy);

            predRow.sort((el1, el2)=>el1.bussyAll - el2.bussyAll);

            currentRowSort.map((el, i)=>{
                let predElem = predRow[i];

                map[row][predElem['ind']] = 
                {
                    el: el.$el[0],
                    rowBusy: el.rowBusy,
                    bussyAll: predElem.bussyAll + el.rowBusy
                }
            });
        }

        function createFirstRow(row, col, el){
            let $el = $(el);
            let busyRow = Math.ceil($el.height() / fullRowSize);

            map[row][col] = {
                el,
                rowStart: 1,
                bussyAll: busyRow
            }
        }

        function setGridParams(row, rowInd) {
            row.map((item, ind)=>{
                if(!item.el) return;
                item.el.style.gridRow = `${item.rowStart || map[rowInd - 1][ind].bussyAll + 1} / ${item.bussyAll}`;
                item.el.style.gridColumn = `${ind+1} / ${ind+2}`;
               
            });
        }


    masonryWrapper.style.gridTemplateRows =  `repeat(${Math.ceil(rowCount)}, ${rowGap}px)`;

    console.log(map)









});
