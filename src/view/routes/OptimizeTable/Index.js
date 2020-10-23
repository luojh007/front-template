import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Button } from 'antd';
import { getTableData, getColunmData, getExtraTableData } from '../../../server/table';
import { objToArr } from '../../../core/_utils/common';
const OptimizeTable = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [selectRow, setSelectRow] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const query = {
      mothername: 'auto',
      barcode: '',
      personsex: '',
      samplequality: '',
      areaid: '',
      hosid: '',
      labresult: '正常',
      intervaltype: 'labstring',
      sampletype: '',
      processstate: '99',
      datetype: 'birthday',
      date1: '',
      date2: '',
      mobile: '',
      cavstate: '',
      labitemstype: '1',
      labitems: 'PHE',
      samplestate: '',
      bloodQuality: '',
      geneType: '',
      isSecondOrderScreening: '',
      filename: '',
      cmcode: 'sample-export',
      modifydetail: {
        mothername: 'auto',
        barcode: '',
        personsex: '',
        samplequality: '',
        areaid: '',
        hosid: '',
        labresult: '正常',
        intervaltype: 'labstring',
        sampletype: '',
        processstate: '99',
        datetype: 'birthday',
        date1: null,
        date2: null,
        mobile: '',
        cavstate: '',
        labitemstype: '1',
        labitems: 'PHE',
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
    getTableData(query).then(res => {
      if (res && res.Rows) {
        for (let index = 0; index < res.Rows.length; index++) {
          res.Rows[index].preExpand = '';
        }
        setRowData(res.Rows);
      }
    });
    const parmas = {
      centerid: 'bb717701-10de-47ee-b49e-693261c6df22',
      code: 'grid-samplesearch',
      _: 1603335075889
    };
    getColunmData(parmas).then(res => {
      if (res && res[0]) {
        const data = objToArr(JSON.parse(res[0].custom || '{}') || {});
        // 手动增加展开前缀
        data.length && data.unshift({ id: 'preExpand', elementname: '' });
        setColumnData(data);
      }
    });
  }

  function onButtonClick(e) {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    setSelectRow(selectedData);
  }
  function getExpandData(item) {
    console.log(item);
    const { data, successCallback } = item;
    const params = {
      param: { condition: { sampleid: data.sampleid } }
    };
    getExtraTableData(params).then(res => {
      if (res && res.Rows) {
        successCallback(res.Rows);
      }
    });
  }
  function isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[1] === params.column;
    return thisIsFirstColumn;
  }

  const MyRenderer = props => {
    return <div>{props.value}</div>;
  };
  return (
    <div className='ag-theme-alpine' style={{ height: 800 }}>
      <Button onClick={onButtonClick}>Get selected rows</Button>
      <AgGridReact
        masterDetail={true}
        onGridReady={onGridReady}
        rowSelection='multiple'
        rowData={rowData}
        pagination={true}
        paginationPageSize={500}
        defaultColDef={{
          headerCheckboxSelection: isFirstColumn,
          checkboxSelection: isFirstColumn
        }}
        frameworkComponents={{
          myRenderer: MyRenderer
        }}
        detailCellRendererParams={{
          detailGridOptions: {
            columnDefs: [
              { field: 'labitem', headerName: '实验项目' },
              { field: 'labdate', headerName: '实验日期' },
              {
                field: 'labvalue',
                headerName: '实验值'
              },
              {
                field: 'labresult',
                headerName: '实验结论'
              },
              {
                field: 'processstate',
                headerName: '流程状态',
                cellRenderer: params => {
                  return params.value === 2 ? '待验收' : params.value === 99 ? '完成' : '111';
                }
              },
              {
                field: 'labadvice',
                headerName: '实验医嘱'
              }
            ]
          },
          getDetailRowData: getExpandData
        }}
      >
        {columnData.map(({ id, elementname }, inx) => {
          return (
            <AgGridColumn
              cellRenderer={inx === 0 ? 'agGroupCellRenderer' : 'myRenderer'}
              showRowGroup={true}
              field={id}
              headerName={elementname}
              filter={id !== 'preExpand'}
              width={id === 'preExpand' ? 60 : ''}
              key={inx}
            />
          );
        })}
      </AgGridReact>
    </div>
  );
};
export default OptimizeTable;
