
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
import { AutoComplete } from 'primereact/autocomplete';
import { InputTextarea } from 'primereact/inputtextarea';

import Moment from 'react-moment';
import 'moment-timezone';
import  EquiposService  from '../service/EquiposService';
import SedesService from '../service/SedesService';


import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';
import { addLocale } from 'primereact/api';



const Equipos = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});

let today = new Date();

    let invalidDates = [today];

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });
   
const [lstSedes, setLstSedes] = useState([]);
const [lstEquipos, setLstEquipos] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgEquipos, setDlgEquipos] = useState(false);
const [Equipos, setEquipos] = useState({
   num_serie: ''
   ,estacion: ''
   ,detalle: ''
   ,compra: ''
   ,install: ''
   ,tipo_id: ''
   ,empresa_id: ''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Equipos']);
const [captura, setCaptura] = useState(false);
const equiposService = new EquiposService(); //MODIFICAR SERVICES
const sedesService = new SedesService();




//Equipo
const equiposSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}


const obtenerEquipo = ()   =>   { //MODIFICAR EN SERVICE
equiposService.obtenerEquipo ().then(data => setLstEquipos(data));
};
const obtenerSede = ()   =>   { //MODIFICAR EN SERVICE
   sedesService.obtenerSede ().then(data => setLstSedes(data));
};
const seleccionaEquipo = (pEquipos)   =>   {
setCaptura(false);
formik.resetForm();
equiposService.seleccionaEquipo (pEquipos).then(data => setEquipos(data));
setDlgEquipos(true);
};
useEffect(()   =>   {
   obtenerSede();
   },);
useEffect(()   =>   {
obtenerEquipo();
},  [txtCriterio]);


const agregaEquipo = ()   =>   {
equiposService.agregaEquipo (Equipos).then(data => {setEquipos(data);
equiposSuccess('success',t('Equipos:cabecero.exito'),t('Equipos:mensaje.agregar'));
setDlgEquipos(false);
obtenerEquipo ();
});
};

const eliminaEquipo = (pEquipos)   =>   {
   equiposService.eliminaEquipo (pEquipos).then(data => setEquipos(data));
   equiposSuccess('success',t('Equipos:cabecero.exito'),t('Equipos:mensaje.eliminar'));
   setDlgEquipos(false);
   obtenerEquipo();
   obtenerEquipo();
   obtenerEquipo();
};

const actualizaEquipo = ()   =>   {
equiposService.actualizaEquipo (Equipos).
then(data => { setDlgEquipos(false); obtenerEquipo();});
};

const updateProperty = (propiedad, valor)   =>  {
let equipoCopy = Object.assign({}, Equipos);
equipoCopy[propiedad] = valor;
setEquipos(equipoCopy);
};

const iniciaEquipos = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgEquipos(true);
};

const iniciaComponentes = ()   =>   {
setEquipos({
   num_serie: ''
   ,estacion: ''
   ,detalle: ''
   ,compra: ''
   ,install: ''
   ,tipo_id: ''
   ,empresa_id: ''
});
formik.resetForm();
};

/**
* Validación de las propiedades 
*
*/
const validate = () => {
const errors = {};
 if (!Equipos.num_serie) {
errors.txtSerialEquipo= t('Equipos:required.num_serie');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
//validate,
onSubmit: () => {
if(captura){
agregaEquipo();
} else{
actualizaEquipo();
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
   <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaEquipo(rowData);} }></Button>
   <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaEquipo(rowData); } }></Button>
</div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Equipos:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgEquipos(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Equipos:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaEquipo }></Button>}                 
         { !captura   &&  <Button tooltip={t('Equipos:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Equipos:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Equipos:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Equipos:placeholder.num_serie')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Equipos:boton.agregar')} icon="pi pi-plus" onClick={iniciaEquipos}></Button></div>
      </div>
   </div>
   <DataTable value={lstEquipos} paginator={true} rows={10} responsive={true}>
      <Column field="num_serie" header={t('Equipos:label.num_serie')} sortable={true}></Column>
      <Column field="estacion" header={t('Equipos:label.estacion')} sortable={true}></Column>
      <Column field="compra" header={t('Equipos:label.compra')} sortable={true}></Column>
      <Column field="tipo" header={t('Equipos:label.tipo')} sortable={true}></Column>
      <Column field="empresa" header={t('Equipos:label.empresa')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Equipos:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Equipos:rotulo.agregar')} footer={dlgFooter} visible={dlgEquipos} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgEquipos(false)} blockScroll={false}>
      { Equipos  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
         <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNumSerie">
                      {t('Equipos:label.num_serie')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtNumSerie" placeholder={t('Equipos:placeholder.num_serie')} value={Equipos.num_serie} className={formik.errors.txtNumSerie ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('num_serie', e.target.value)}></InputText>    

                ):(     <label id="txtTipo">equipos.num_serie</label>)}
    
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtEstacion">
                      {t('Equipos:label.estacion')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtEstacion" placeholder={t('Equipos:placeholder.estacion')} value={Equipos.estacion} className={formik.errors.txtEstacion ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('estacion', e.target.value)}></InputText>    

                ):(     <label id="txtEstacion">equipos.estacion</label>)}
    
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtEsp">
                      {t('Equipos:label.especificaciones')}
                      </label>
                   {{captura} ? ( 
                <InputTextarea placeholder={t('Equipos:placeholder.especificaciones')} className={formik.errors.txtEsp ? 'p-invalid':'p-inputtext'} value={Equipos.detalle} onChange={(e) =>  updateProperty('detalle', e.target.value)} rows={3} cols={20} autoResize />
                ):(     <label id="txtEsp">equipos.especificaciones</label>)}
                    
                </div>
                <div className="p-field p-col-12 p-md-6"><label htmlFor="txtFechaCompra">
                      {t('Equipos:label.compra')}
                      </label>
                   {{captura} ? ( 
                        <InputMask id="date" mask="9999-99-99"  slotChar="yyyy/mm/dd" placeholder={t('Equipos:placeholder.compra')} value={Equipos.compra} onChange={(e) =>   updateProperty('compra', e.target.value)}></InputMask>
                        ):(     <label id="txtFechaCompra">equipos.compra</label>)}
                   
                </div>
               
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtInstall">
                      {t('Equipos:label.can_install')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtInstall" placeholder={t('Equipos:placeholder.can_install')} value={Equipos.install} className={formik.errors.txtInstall ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('install', e.target.value)}></InputText>    

                ):(     <label id="txtInstall">equipos.install</label>)}
    
                </div>

                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtTipo">
                      {t('Equipos:label.tipo')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtTipo" placeholder={t('Equipos:placeholder.tipo')} value={Equipos.tipo_id} className={formik.errors.txtTipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('tipo_id', e.target.value)}></InputText>    

                ):(     <label id="txtTipo">equipos.tipo</label>)}
    
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtEmpresa">
                      {t('Equipos:label.empresa')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtEmpresa" placeholder={t('Equipos:placeholder.empresa')} value={Equipos.empresa_id} className={formik.errors.txtEmpresa ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('empresa_id', e.target.value)}></InputText>    
               ):(    <label id="txtEmpresa">equipos.empresa_id</label>)}
                   
                </div>
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Equipos;                                        	


