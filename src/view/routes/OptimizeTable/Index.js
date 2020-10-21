import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { getTableData } from '../../../server/table';
const OptimizeTable = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    const params = {
      mothername: '',
      barcode: '',
      personsex: '',
      samplequality: '',
      areaid: '',
      hosid: '',
      labresult: '',
      intervaltype: 'labstring',
      sampletype: '',
      processstate: '',
      datetype: 'birthday',
      date1: '',
      date2: '',
      mobile: '',
      cavstate: '',
      labitemstype: '',
      samplestate: '',
      bloodQuality: '',
      geneType: '',
      isSecondOrderScreening: '',
      filename: '',
      cmcode: 'sample-export',
      modifydetail: {
        mothername: '',
        barcode: '',
        personsex: '',
        samplequality: '',
        areaid: '',
        hosid: '',
        labresult: '',
        intervaltype: 'labstring',
        sampletype: '',
        processstate: '',
        datetype: 'birthday',
        date1: null,
        date2: null,
        mobile: '',
        cavstate: '',
        labitemstype: '',
        samplestate: '',
        bloodQuality: '',
        geneType: '',
        isSecondOrderScreening: '',
        filename: '',
        cmcode: 'sample-export'
      },
      sortname: 'labstring',
      sortorder: 'asc',
      centerid: 'bb717701-10de-47ee-b49e-693261c6df22',
      pagesize: '500',
      page: '1'
    };
    getTableData(params).then(res => {
      console.log(res);
    });
    setTimeout(() => {
      setRowData([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]);
    }, 500);
  }, []);
  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onButtonClick = e => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData
      .map(node => node.make + ' ' + node.model + ' ' + node.price)
      .join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };
  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: 600 }}>
      <Button onClick={onButtonClick}>Get selected rows</Button>
      <AgGridReact
        suppressExpandablePivotGroups
        groupDefaultExpanded={1}
        onExpandOrCollapseAll={e => console.log(e)}
        onGridReady={onGridReady}
        rowSelection='multiple'
        rowData={rowData}
      >
        <AgGridColumn
          sortable={true}
          filter={true}
          checkboxSelection={true}
          field='make'
        ></AgGridColumn>
        <AgGridColumn sortable={true} filter={true} field='model'></AgGridColumn>
        <AgGridColumn sortable={true} filter={true} field='price'></AgGridColumn>
      </AgGridReact>
    </div>
  );
};
export default OptimizeTable;
