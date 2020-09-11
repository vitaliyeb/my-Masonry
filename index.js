window.addEventListener('load', function (){
    let masonryWrapper = $('#myMasonry');
    if(!masonryWrapper.length) return ;

    let allItems = masonryWrapper.children(),
        rowSize = 10,
        rowGap = parseInt(masonryWrapper.css('row-gap')),
        columnGap = parseInt(masonryWrapper.css('column-gap')),
        itemWidth = Number($(allItems[0]).width()),
        wrapperWidth = Number(masonryWrapper.width()),
        countColomn = Math.ceil(wrapperWidth / (itemWidth+columnGap)),
        fullRowSize = rowSize + rowGap,
        rowCount = Math.ceil(masonryWrapper.height() / fullRowSize),
        map = [],
        currentRowSort = [];

        for (let row = 0; row < Math.ceil(allItems.length / countColomn); row++){
            currentRowSort= [];
            map.push([]);
            for (let col = 0; col < countColomn; col++ ){
                let el = allItems[row*countColomn+col];
                if (row === 0) {
                    createFirstRow(row, col, el);
                    continue;
                };
                if (!el) {
                    currentRowSort.push({
                        $el: false,
                        rowBusy: 0
                    });
                    continue;
                };
                currentRowSort.push({
                    $el: $(el),
                    rowBusy: Math.ceil($(el).height() / fullRowSize)
                });
            }
            if (!currentRowSort.length) continue;
            createRow(row);
        };

        function createRow(row) {
            let predRow = map[row-1].map((el, ind)=>({bussyAll: el.bussyAll, ind}));
            
            currentRowSort.sort((e1, e2)=> e2.rowBusy - e1.rowBusy);

            predRow.sort((el1, el2)=>el1.bussyAll - el2.bussyAll);

            currentRowSort.map((el, i)=>{
                let predElem = predRow[i];

                map[row][predElem['ind']] = 
                {
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
                busyRow,
                bussyAll: busyRow
            }
        }

        function setGridParams(row, col, el) {
            
        }


    // masonryWrapper.css('grid-template-rows', `repeat(${Math.ceil(rowCount)}, ${rowGap}px)`);

    console.log(map)









});
