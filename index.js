
(function(){

        function init(masonryWrapper) {
            let cssDataMW = getComputedStyle(masonryWrapper),
                allItems = masonryWrapper.children,
                rowSize = 10,
                rowGap = parseInt(cssDataMW.rowGap) || 0,
                columnGap = parseInt(cssDataMW.columnGap) || 0,
                itemWidth = Number(allItems[0].offsetWidth ),
                wrapperWidth = Number(masonryWrapper.offsetWidth - parseInt(cssDataMW.paddingLeft) - parseInt(cssDataMW.paddingRight)),
                countColomn = Math.ceil(wrapperWidth / (itemWidth+columnGap)),
                fullRowSize = rowSize + rowGap,
                rowCount = Math.ceil(masonryWrapper.offsetHeight / fullRowSize),
                map = [];

            for (let row = 0; row < Math.ceil(allItems.length / countColomn); row++){
                let currentRow = [];
                for (let col = 0; col < countColomn; col++ ){
                    let el = allItems[row * countColomn + col];
                    let rowBusy = el ? Math.ceil(el.offsetHeight / fullRowSize) + 1 : -1;
                    currentRow.push({
                        el,
                        rowBusy,
                        busyAll: row === 0 ? rowBusy : undefined
                    });
                }
                sortCurrentRow(map, currentRow, row);
                setGridParams(map[row], row);
            }
    
            let maxRowCount = Math.max(...map[map.length-1].map(item=>item.busyAll));
            masonryWrapper.style.gridTemplateRows =  `repeat(${ maxRowCount }, ${rowSize}px)`;
            masonryWrapper.style.alignItems = 'stretch';
        }

        function sortCurrentRow(map, currentRow, rowIndex) {
            if(rowIndex === 0) return map.push(currentRow);
            map[rowIndex] = [];
            
            let predRow = map[rowIndex-1].map((item, ind)=>({
                index: ind,
                busyAll: item.busyAll
            }));

            currentRow.sort((itemBefore, item)=> item.rowBusy - itemBefore.rowBusy);
            predRow.sort((itemBefore, item)=> itemBefore.busyAll - item.busyAll);

            predRow.map(({index, busyAll}, i)=>{
                map[rowIndex][index] = {
                    ...currentRow[i],
                    busyAll: busyAll + currentRow[i].rowBusy + 1
                }
            });
        }

        function setGridParams(row, rowInd) {
            row.map(({el, rowBusy, busyAll}, ind)=>{
                if(!el) return;
                el.style.height = 'auto';
                el.style.gridRow = `${busyAll - rowBusy + (rowInd === 0 ? 1 : 0) } / ${busyAll + 1}`;
                el.style.gridColumn = `${ind+1} / ${ind+2}`;
            });
        }

        function setVariable(){

        }

        window.myMasonry = function(masonryWrapper, onUpdateResize ){  
            
            if(onUpdateResize) window.addEventListener('resize', init);
            init(masonryWrapper);
        }

})();


// myMasonry(document.getElementById('myMasonry'));