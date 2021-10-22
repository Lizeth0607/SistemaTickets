
import React, {  useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputMask } from "primereact/inputmask";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import Moment from 'react-moment';
import 'moment-timezone';
import TblSentidosSentenciasService from '../service/TblSentidosSentenciasService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';



const TblSentidosSentencias = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [selectedCity1, setSelectedCity1] = useState(null);
const cities = [
   { name: 'New York', code: 'NY' },
   { name: 'Rome', code: 'RM' },
   { name: 'London', code: 'LDN' },
   { name: 'Istanbul', code: 'IST' },
   { name: 'Paris', code: 'PRS' }
];
const onCityChange = (e) => {
   setSelectedCity1(e.value);
}


const [lstTblSentidosSentencias, setLstTblSentidosSentencias] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgTblSentidosSentencias, setDlgTblSentidosSentencias] = useState(false);
const [tblSentidosSentencias, setTblSentidosSentencias] = useState({cveSentidoSentencia:null
,descSentidoSentencia:''
,activo:false
,fechaRegistro:''
,fechaActualizacion:''
});
const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','tblSentidosSentencias']);
const [captura, setCaptura] = useState(false);
const tblSentidosSentenciasService = new TblSentidosSentenciasService();


const obtenerTblSentidosSentencias = ()   =>   {
   tblSentidosSentenciasService.obtenerTblSentidosSentencias (txtCriterio).then(data => setLstTblSentidosSentencias(data));
   console.log(setLstTblSentidosSentencias);
   };

const tblSentidosSentenciasSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}



const seleccionaTblSentidosSentencias = (pTblSentidosSentencias)   =>   {
setCaptura(false);
formik.resetForm();
tblSentidosSentenciasService.seleccionaTblSentidosSentencias (pTblSentidosSentencias).then(data => setTblSentidosSentencias(data));
setDlgTblSentidosSentencias(true);
};

useEffect(()   =>   {
   obtenerTblSentidosSentencias();
},  [txtCriterio]);


const agregaTblSentidosSentencias = ()   =>   {
tblSentidosSentenciasService.agregaTblSentidosSentencias (tblSentidosSentencias).
then(data => {setTblSentidosSentencias(data);
tblSentidosSentenciasSuccess('success',t('cabecero.exito'),t('mensaje.agregar'));
setDlgTblSentidosSentencias(false);
});
};

const eliminaTblSentidosSentencias = ()   =>   {
tblSentidosSentenciasService.eliminaTblSentidosSentencias (tblSentidosSentencias);
tblSentidosSentenciasSuccess('success',t('cabecero.exito'),t('mensaje.eliminar'));
setDlgTblSentidosSentencias(false);
};

const actualizaTblSentidosSentencias = ()   =>   {
tblSentidosSentenciasService.actualizaTblSentidosSentencias (tblSentidosSentencias).
then(data => { setDlgTblSentidosSentencias(false);});
};

const updateProperty = (propiedad, valor)   =>  {
let tblSentidosSentenciasCopy = Object.assign({}, tblSentidosSentencias);
tblSentidosSentenciasCopy[propiedad] = valor;
setTblSentidosSentencias(tblSentidosSentenciasCopy);
};

const iniciaTblSentidosSentencias = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgTblSentidosSentencias(true);
};

const iniciaComponentes = ()   =>   {
setTblSentidosSentencias({cveSentidoSentencia:null
,descSentidoSentencia:''
,activo:false
,fechaRegistro:''
,fechaActualizacion:''
});
formik.resetForm();
};

/**
* Validación de las propiedades de tblSentidosSentencias
*
*/
const validate = () => {
const errors = {};
 if (!tblSentidosSentencias.descSentidoSentencia) {
errors.txtDescSentidoSentencia= t('tblSentidosSentencias:required.descSentidoSentencia');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaTblSentidosSentencias();
} else{
actualizaTblSentidosSentencias();
}
},
});

const fechaTemplate = (rowData, column)   =>   {
return (
<div>
   <Moment format={t('formato.fechaHora')}>
      {rowData.fechaAlta ? rowData.fechaAlta: null}
      
   </Moment>
</div>);      
}


const actionTemplate = (rowData, column)   =>   {
return (
<div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaTblSentidosSentencias(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaTblSentidosSentencias(rowData); } }></Button></div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgTblSentidosSentencias(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaTblSentidosSentencias }></Button>}                 
         { !captura   &&  <Button tooltip={t('boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="tblSentidosSentencias:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('placeholder.criterio')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('boton.agregar')} icon="pi pi-plus" onClick={iniciaTblSentidosSentencias}></Button></div>
      </div>
   </div>
   <DataTable value={lstTblSentidosSentencias} paginator={true} rows={10} responsive={true}>
      <Column field="descSentidoSentencia" header={t('tblSentidosSentencias:label.descSentidoSentencia')} sortable={true}></Column>
      <Column field="activo" header={t('tblSentidosSentencias:label.activo')} sortable={true}></Column>
      <Column field="fechaRegistro" header={t('tblSentidosSentencias:label.fechaRegistro')} sortable={true}></Column>
      <Column field="fechaActualizacion" header={t('tblSentidosSentencias:label.fechaActualizacion')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('tblSentidosSentencias:rotulo.agregar')} footer={dlgFooter} visible={dlgTblSentidosSentencias} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgTblSentidosSentencias(false)} blockScroll={false}>
      { tblSentidosSentencias  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtDescSentidoSentencia">
                  {t('tblSentidosSentencias:label.descSentidoSentencia')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtDescSentidoSentencia" placeholder={t('tblSentidosSentencias:placeholder.descSentidoSentencia')} value={tblSentidosSentencias.descSentidoSentencia} className={formik.errors.txtDescSentidoSentencia ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('descSentidoSentencia', e.target.value)}></InputText>    
               ):(     <label id="txtDescSentidoSentencia">tblSentidosSentencias.descSentidoSentencia</label>)}
               
               {formik.errors.txtDescSentidoSentencia  &&  <small id="txtDescSentidoSentencia-help" className="p-invalid">
                  {formik.errors.txtDescSentidoSentencia}
                  </small>}                 
               
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtActivo">
                  {t('tblSentidosSentencias:label.activo')}
                  </label>
               {{captura} ? ( 
               <ToggleButton id="txtActivo" checked={tblSentidosSentencias.activo} onChange={(e)   =>   updateProperty('activo', e.value)} onLabel={t('rotulo.si')} offLabel={t('rotulo.no')} onIcon="pi pi-check" offIcon="pi pi-times"></ToggleButton>    
               ):(     <label id="txtActivo">tblSentidosSentencias.activo</label>)}
               
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtFechaRegistro">
                  {t('tblSentidosSentencias:label.fechaRegistro')}
                  </label>
               {{captura} ? ( 
               <InputMask id="txtFechaRegistro" mask="9999-99-99T99:99:99" placeholder={t('tblSentidosSentencias:placeholder.fechaRegistro')} value={tblSentidosSentencias.fechaRegistro} className={formik.errors.txtFechaRegistro ? 'p-invalid':'p-inputtext'} maxLength={19} onChange={(e) =>   updateProperty('fechaRegistro', e.target.value)}></InputMask>    
               ):(     <label id="txtFechaRegistro">tblSentidosSentencias.fechaRegistro</label>)}
               
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtFechaActualizacion">
                  {t('tblSentidosSentencias:label.fechaActualizacion')}
                  </label>
               {{captura} ? ( 
               <InputMask id="txtFechaActualizacion" mask="9999-99-99T99:99:99" placeholder={t('tblSentidosSentencias:placeholder.fechaActualizacion')} value={tblSentidosSentencias.fechaActualizacion} className={formik.errors.txtFechaActualizacion ? 'p-invalid':'p-inputtext'} maxLength={19} onChange={(e) =>   updateProperty('fechaActualizacion', e.target.value)}></InputMask>    
               ):(     <label id="txtFechaActualizacion">tblSentidosSentencias.fechaActualizacion</label>)}
               
            </div>
         </div>
      </div>
      
      }
      
   </Dialog>
   <h5>Basic</h5>
                <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a City" />
</div>
);



}                
export default TblSentidosSentencias;                                        	


