
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
import AplicacionesService from '../service/AplicacionesService';
import { addLocale } from 'primereact/api';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Aplicaciones = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});

 
const [lstAplicaciones, setLstAplicaciones] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgAplicaciones, setDlgAplicaciones] = useState(false);
const [Aplicaciones, setAplicaciones] = useState({id:null
,nombre:''
,version:''
,fecha_compra:''
});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Aplicaciones']);
const [captura, setCaptura] = useState(false);
const aplicacionesService = new AplicacionesService(); //MODIFICAR SERVICES
let today = new Date();

    let invalidDates = [today];

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });

const aplicacionesSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}


const obtenerApp = ()   =>   { //MODIFICAR EN SERVICE
aplicacionesService.obtenerApp (txtCriterio).then(data => setLstAplicaciones(data));
};

const seleccionaApp = (pApps)   =>   {
setCaptura(false);
formik.resetForm();
aplicacionesService.seleccionaApp (pApps).then(data => setAplicaciones(data));
setDlgAplicaciones(true);
};

useEffect(()   =>   {
obtenerApp();
},  [txtCriterio]);


const agregaApp = ()   =>   {
aplicacionesService.agregaApp (Aplicaciones).then(data => {setAplicaciones(data);
aplicacionesSuccess('success',t('Aplicaciones:cabecero.exito'),t('Aplicaciones:mensaje.agregar'));
setDlgAplicaciones(false);
obtenerApp ();
});
};

const eliminaApp = (pApps)   =>   {
   aplicacionesService.eliminaApp (pApps).then(data => setAplicaciones(data));
   aplicacionesSuccess('success',t('Aplicaciones:cabecero.exito'),t('Aplicaciones:mensaje.eliminar'));
   setDlgAplicaciones(false);
   obtenerApp();
   obtenerApp();
   obtenerApp();
};

const actualizaApp = ()   =>   {
aplicacionesService.actualizaApp (Aplicaciones).then(data => { setDlgAplicaciones(false);
aplicacionesSuccess('success',t('Aplicaciones:cabecero.exito'),t('Aplicaciones:mensaje.editar'));
setDlgAplicaciones(false);
obtenerApp();});

};

const updateProperty = (propiedad, valor)   =>  {
let aplicacionCopy = Object.assign({}, Aplicaciones);
aplicacionCopy[propiedad] = valor;
setAplicaciones(aplicacionCopy);
};

const iniciaAplicaciones = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgAplicaciones(true);
};

const iniciaComponentes = ()   =>   {
setAplicaciones({id:null
    ,nombre:''
    ,version:''
    ,fecha_compra:''
});
formik.resetForm();
};

/**
* Validación de las propiedades
*
*/
const validate = () => {
const errors = {};
 if (!Aplicaciones.nombre) {
errors.txtNombre= t('Aplicaciones:required.nombre');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaApp();
} else{
actualizaApp();
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
      <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaApp(rowData);} }></Button>
      <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaApp(rowData); } }></Button>
   </div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Aplicaciones:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgAplicaciones(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Aplicaciones:boton.actualizar')} icon="pi pi-check-circle" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Aplicaciones:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Aplicaciones:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Aplicaciones:placeholder.nombre')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Aplicaciones:boton.agregar')} icon="pi pi-plus" onClick={iniciaAplicaciones}></Button></div>
      </div>
   </div>
   <DataTable value={lstAplicaciones} paginator={true} rows={10} responsive={true}>
      <Column field="id" header={t('Aplicaciones:label.id')} sortable={true}></Column>
      <Column field="nombre" header={t('Aplicaciones:label.nombre')} sortable={true}></Column>
      <Column field="version" header={t('Aplicaciones:label.version')} sortable={true}></Column>
      <Column field="fecha_compra" header={t('Aplicaciones:label.fecha_compra')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Aplicaciones:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Aplicaciones:rotulo.agregar')} footer={dlgFooter} visible={dlgAplicaciones} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgAplicaciones(false)} blockScroll={false}>
      <form>
      { Aplicaciones  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtNombre">
                  {t('Aplicaciones:label.nombre')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombre" placeholder={t('Aplicaciones:placeholder.nombre')} value={Aplicaciones.nombre} className={formik.errors.txtNombre ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
               ):(     <label id="txtNombre">aplicaciones.nombre</label>)}
               
               {formik.errors.txtNombre  &&  <small id="txtNombre-help" className="p-invalid">
                  {formik.errors.txtNombre}
                  </small>}                 
               
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtVersion">
                      {t('Aplicaciones:label.version')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtVersion" placeholder={t('Aplicaciones:placeholder.version')} value={Aplicaciones.version} className={formik.errors.txtVersion ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('version', e.target.value)}></InputText>    

                ):(     <label id="txtVersion">aplicaciones.version</label>)}
            </div>
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtFecha">
                      {t('Aplicaciones:label.fecha_compra')}
                      </label>
                   {{captura} ? ( 
                        <InputMask id="date" mask="9999-99-99"  slotChar="yyyy-mm-dd" placeholder={t('Aplicaciones:placeholder.fecha_compra')} value={Aplicaciones.fecha_compra} onChange={(e) =>   updateProperty('fecha_compra', e.target.value)}></InputMask>
                        ):(     <label id="txtFecha">aplicaciones.compra</label>)}
            </div>
                       
         </div>
      </div>
      
      }
      </form>
   </Dialog>
</div>
);



}                
export default Aplicaciones;                                        	


