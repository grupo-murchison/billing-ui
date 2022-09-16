import { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryLine, VictoryPie, VictoryScatter } from 'victory';
import './styles.scss';

const baseCalc = 100;

export const PieChart = (datos: any) => {
  const [dataTable, SetdataTable] = useState([
    { y: 2, label: 'one' },
    { y: 3, label: 'two' },
    { y: 5, label: 'three' },
  ]);
  useEffect(() => {
    const dato1 = datos.datos[0];
    SetdataTable([
      { y: dato1?.fat, label: `fat ${dato1?.fat}%` },
      { y: dato1?.carbs, label: `carbs ${dato1?.carbs}% ` },
      { y: dato1?.protein, label: `protein ${dato1?.protein}%` },
      {
        y: baseCalc - (dato1?.fat + dato1?.carbs + dato1?.protein),
        label: `other ${baseCalc - (dato1?.fat + dato1?.carbs + dato1?.protein)}%`,
      },
    ]);
  }, [datos]);

  return (
    <div className='Chart'>
      <VictoryPie width={500} colorScale={'blue'} data={dataTable} />
    </div>
  );
};
export const BarChart = (datos: any) => {
  const [dataTable, SetdataTable] = useState([
    { x: '1', y: 2, label: 'one' },
    { x: '2', y: 3, label: 'two' },
    { x: '3', y: 5, label: 'three' },
  ]);
  useEffect(() => {
    const dato1 = datos.datos[0];
    SetdataTable([
      { x: 'fat', y: dato1?.fat, label: `${dato1?.fat}%` },
      { x: 'carbs', y: dato1?.carbs, label: `${dato1?.carbs}% ` },
      { x: 'protein', y: dato1?.protein, label: `${dato1?.protein}%` },
      {
        x: 'other',
        y: baseCalc - (dato1?.fat + dato1?.carbs + dato1?.protein),
        label: `${baseCalc - (dato1?.fat + dato1?.carbs + dato1?.protein)}%`,
      },
    ]);
  }, [datos]);
  return (
    <div className='Chart'>
      <VictoryChart domainPadding={{ x: 50 }}>
        <VictoryBar
          barRatio={0.5}
          style={{
            data: { fill: 'blue' },
          }}
          // events={[{
          //     target: "data",
          //     eventHandlers: {
          //       onClick: () => {
          //         return[
          //       {
          //             target: "data",
          //             mutation: (props) => {
          //               const fill = props.style && props.style.fill;
          //               return fill === "black" ? null : { style: { fill: "black" } };
          //             }
          //           }
          //         ];
          //       }
          //     }
          //   }]}
          data={dataTable}
        />
      </VictoryChart>
    </div>
  );
};

export const DispersionChart = (datos: any) => {
  const [dataTable, setDataTable] = useState([{ y: 1 }]);
  useEffect(() => {
    setDataTable([
      { y: datos?.datos[0].fat },
      { y: datos?.datos[1].fat },
      { y: datos?.datos[2].fat },
      { y: datos?.datos[3].fat },
      { y: datos?.datos[4].fat },
      { y: datos?.datos[5].fat },
    ]);

    //  const length=datos?.datos?.length || 0

    // for( let i=1; i<length;i++) {
    //     if (length>0){
    //         console.log('entra aca')
    //     if(i==1){
    //         console.log('pasa por aca 1 vez')

    //         setDataTable([{y:datos?.datos[0]?.carbs}])
    //     }
    //     else{
    //      setDataTable([
    //         ...dataTable,
    //         {y:datos?.datos[i+1]?.carbs}
    //         ])
    //     }

    // }  }
  }, [datos]);
  return (
    <div className='Chart'>
      <VictoryChart>
        <VictoryLine
          style={{
            data: { stroke: 'blue' },
            parent: { border: '1px solid #ccc' },
          }}
          data={dataTable}
        />
        <VictoryScatter style={{ data: { fill: 'blue' } }} size={7} data={dataTable} />
      </VictoryChart>
    </div>
  );
};
