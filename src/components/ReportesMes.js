
import React, {  useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputMask } from "primereact/inputmask";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import Swal from 'sweetalert2';
import { Column } from 'primereact/column';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';

import Moment from 'react-moment';
import 'moment-timezone';
import ReportesService from '../service/ReportesService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';


const ReportesMes = ()   =>   {
   const [products, setProducts] = useState([]);
   const [selectedProducts, setSelectedProducts] = useState([]);
   const [importedData, setImportedData] = useState([]);
   const [selectedImportedData, setSelectedImportedData] = useState([]);
   const [importedCols, setImportedCols] = useState([{ field: '', header: 'Header' }]);
   const dt = useRef(null);
   const toast = useRef(null);
   const reportesService = new ReportesService();

   const cols = [
    { field: 'MONTH', header: 'Mes' },
    { field: 'KPI', header: 'Indicador(KPI)' },
    { field: 'TOTAL', header: 'Total' },
  
   ];

   const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

   useEffect(() => {
       reportesService.getProductsSmall().then(data => setProducts(data));
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   const exportCSV = (selectionOnly) => {
       dt.current.exportCSV({ selectionOnly });
   }
   
   const exportPdf = () => {
       import('jspdf').then(jsPDF => {
           import('jspdf-autotable').then(() => {
               const doc = new jsPDF.default(0, 0);
               doc.autoTable(exportColumns, products);
               doc.save('reporte_hpp.pdf');
           })
       })
   }

   const exportExcel = () => {
       import('xlsx').then(xlsx => {
           const worksheet = xlsx.utils.json_to_sheet(products);
           const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
           const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
           saveAsExcelFile(excelBuffer, 'reporte_hpp');
       });
   }

   const saveAsExcelFile = (buffer, fileName) => {
       import('file-saver').then(FileSaver => {
           let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
           let EXCEL_EXTENSION = '.xlsx';
           const data = new Blob([buffer], {
               type: EXCEL_TYPE
           });
           FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
       });
   }

  

   const onSelectionChange = (e) => {
       setSelectedProducts(e.value);
   }

   const header = (
       <div className="p-d-flex p-ai-center export-buttons">
           <Button type="button" icon="pi pi-file" onClick={() => exportCSV(false)} className="p-mr-2" data-pr-tooltip="CSV" />
           <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success p-mr-2" data-pr-tooltip="XLS" />
           <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF" />
       </div>
   );

    
    
    
    
    return (
      <div>
            

            <div className="card">
                <h5>Exportar reporte</h5>

                <Tooltip target=".export-buttons>button" position="bottom" />

                <DataTable ref={dt} value={products} header={header} dataKey="id" responsiveLayout="scroll"
                    selectionMode="multiple" selection={selectedProducts} >
                    {
                        cols.map((col, index) => 
                        <Column key={index} field={col.field} header={col.header} />)
                    }
                </DataTable>
            </div>
        </div>

    );
    
    
    
    }                
    export default ReportesMes;                                        	
    
    
    