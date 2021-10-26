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
import { InputTextarea } from 'primereact/inputtextarea';

import Moment from 'react-moment';
import 'moment-timezone';
import HistorialService from '../service/HistorialService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Historiales = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstHistoriales, setLstHistoriales] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgHistoriales, setDlgHistoriales] = useState(false);
const [Historiales, setHistoriales] = useState({historial_id:null
    ,mov_id:''
,equipo_id:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Historial']);
const [captura, setCaptura] = useState(false);
const historialService = new HistorialService(); //MODIFICAR SERVICES






const historialSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}


const obtenerHistorial = ()   =>   { //MODIFICAR EN SERVICE
   historialService.obtenerHistorial ().then(data => setLstHistoriales(data));
};

const seleccionaHistorial = (pHistorial)   =>   {
setCaptura(false);
formik.resetForm();
historialService.seleccionaHistorial (pHistorial).then(data => setHistoriales(data));
setDlgHistoriales(true);
};

useEffect(()   =>   {
obtenerHistorial();
},  [txtCriterio]);


const agregaHistorial = ()   =>   {
historialService.agregaHistorial(Historiales).then(data => {setHistoriales(data);
historialSuccess('success',t('Historial:mensaje.cabecero'),t('Historial:mensaje.agregar'));
setDlgHistoriales(false);
obtenerHistorial ();
});
};

const eliminaHistorial = (pHistorial)   =>   {
historialService.eliminaHistorial (pHistorial).then(data => setHistoriales(data));
historialSuccess('success',t('Historial:cabecero.exito'),t('Historial:mensaje.eliminar'));
setDlgHistoriales(false);
obtenerHistorial();
obtenerHistorial();
obtenerHistorial();
};

const actualizaHistorial = ()   =>   {
historialService.actualizaHistorial(Historiales).
then(data => { setDlgHistoriales(false); obtenerHistorial();});
};

const updateProperty = (propiedad, valor)   =>  {
let historialCopy = Object.assign({}, Historiales);
historialCopy[propiedad] = valor;
setHistoriales(historialCopy);
};

const iniciaHistoriales = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgHistoriales(true);
};

const iniciaComponentes = ()   =>   {
setHistoriales({historial_id:null
   ,mov_id:''
,equipo_id:''
    
});
formik.resetForm();
};

/**
* Validación de las propiedades 
*
*/
const validate = () => {
const errors = {};
 if (!Historiales.mov_id) {
errors.txtIdMov= t('Historial:required.idMov');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaHistorial();
} else{
actualizaHistorial();
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
<div>
   <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()   =>   {eliminaHistorial(rowData); } }></Button>
   <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaHistorial(rowData); } }></Button>
</div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Historial:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgHistoriales(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Historial:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaHistorial }></Button>}                 
         { !captura   &&  <Button tooltip={t('Historial:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Historial:boton.agregar')} type="button" icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Historial:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Historial:placeholder.idEquipo')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Historial:boton.agregar')} icon="pi pi-plus" onClick={iniciaHistoriales}></Button></div>
      </div>
   </div>
   <DataTable value={lstHistoriales} paginator={true} rows={10} responsive={true}>
      <Column field="historial_id" header={t('Historial:label.idHistorial')} sortable={true}></Column>
      <Column field="mov_id" header={t('Historial:label.idMov')} sortable={true}></Column>
      <Column field="equipo_id" header={t('Historial:label.idEquipo')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Historial:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Historial:rotulo.agregar')} footer={dlgFooter} visible={dlgHistoriales} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgHistoriales(false)} blockScroll={false}>
      { Historiales  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtIdMov">
                  {t('Historial:label.idMov')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtIdMov" placeholder={t('Historial:placeholder.idMov')} value={Historiales.mov_id} className={formik.errors.txtIdMov ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('mov_id', e.target.value)}></InputText>    
               ):(     <label id="txtIdMov">historiales.idMov</label>)}
               
               {formik.errors.txtIdMov  &&  <small id="txtIdMov-help" className="p-invalid">
                  {formik.errors.txtIdMov}
                  </small>}                 
               
            </div>
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtIdEquipo">
                  {t('Historial:label.idEquipo')}
                  </label>
               {{captura} ? ( 
                <InputText id="txtIdEquipo" placeholder={t('Historial:placeholder.idEquipo')} value={Historiales.equipo_id} className={formik.errors.txtIdEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('equipo_id', e.target.value)}></InputText>    
                ):(     <label id="txtIdEquipo">historiales.idEquipo</label>)}
                
            </div>
                
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Historiales;