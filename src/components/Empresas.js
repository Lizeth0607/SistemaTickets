
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
import UbicacionesService from '../service/EmpresasService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Ubicaciones = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstUbicaciones, setLstUbicaciones] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgUbicaciones, setDlgUbicaciones] = useState(false);
const [Ubicaciones, setUbicaciones] = useState({ubicacion_id:null
,nombre:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Ubicaciones']);
const [captura, setCaptura] = useState(false);
const ubicacionesService = new UbicacionesService(); //MODIFICAR SERVICES






const ubicacionesSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}




const obtenerUbicacion= ()   =>   { //MODIFICAR EN SERVICE
   ubicacionesService.obtenerUbicacion ().then(data => setLstUbicaciones(data));

};

const seleccionaUbicacion = (pUbicaciones)   =>   {
    setCaptura(false);
    formik.resetForm();
    ubicacionesService.seleccionaUbicacion (pUbicaciones).then(data => setUbicaciones(data));
    setDlgUbicaciones(true);
};

useEffect(()   =>   {
obtenerUbicacion();
},  [txtCriterio]);


const agregaUbicacion = ()   =>   {
   ubicacionesService.agregaUbicacion (Ubicaciones).then(data => {setUbicaciones(data);
      ubicacionesSuccess('success',t('Ubicaciones:cabecero.exito'),t('Ubicaciones:mensaje.agregar'));
setDlgUbicaciones(false);
obtenerUbicacion ();
});
};

const eliminaUbicacion = (pUbicaciones)   =>   {
   ubicacionesService.eliminaUbicacion (pUbicaciones).then(data => setUbicaciones(data));
   ubicacionesSuccess('success',t('Ubicaciones:cabecero.exito'),t('Ubicaciones:mensaje.eliminar'));
setDlgUbicaciones(false);
obtenerUbicacion();
obtenerUbicacion();
};

const actualizaUbicacion = ()   =>   {
   ubicacionesService.actualizaUbicacion(Ubicaciones).
then(data => { setDlgUbicaciones(false); obtenerUbicacion();});
};

const updateProperty = (propiedad, valor)   =>  {
let ubicacionCopy = Object.assign({}, Ubicaciones);
ubicacionCopy[propiedad] = valor;
setUbicaciones(ubicacionCopy);
};

const iniciaUbicaciones = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgUbicaciones(true);
};

const iniciaComponentes = ()   =>   {
setUbicaciones({ubicacion_id:null
   ,nombre:''
});
formik.resetForm();
};

/**
* Validación de las propiedades 
*
*/
const validate = () => {
const errors = {};
 if (!Ubicaciones.nombre) {
errors.txtNombreUbicacion= t('Ubicaciones:required.nombreUbicacion');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaUbicacion();
} else{
actualizaUbicacion();
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
   <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaUbicacion(rowData);} }></Button>
   <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaUbicacion(rowData); } }></Button>
</div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Ubicaciones:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgUbicaciones(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Ubicaciones:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaUbicacion }></Button>}                 
         { !captura   &&  <Button tooltip={t('Ubicaciones:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Ubicaciones:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Ubicaciones:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Ubicaciones:placeholder.nombreUbicacion')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Ubicaciones:boton.agregar')} icon="pi pi-plus" onClick={iniciaUbicaciones}></Button></div>
      </div>
   </div>
   <DataTable value={lstUbicaciones} paginator={true} rows={10} responsive={true}>
      <Column field="ubicacion_id" header={t('Ubicaciones:label.idUbicacion')} sortable={true}></Column>
      <Column field="nombre" header={t('Ubicaciones:label.nombreUbicacion')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Ubicaciones:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Ubicaciones:rotulo.agregar')} footer={dlgFooter} visible={dlgUbicaciones} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgUbicaciones(false)} blockScroll={false}>
      { Ubicaciones  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombreUbicacion">
                  {t('Ubicaciones:label.nombreUbicacion')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombreUbicacion" placeholder={t('Ubicaciones:placeholder.nombreUbicacion')} value={Ubicaciones.nombre} className={formik.errors.txtNombreUbicacion ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
               ):(     <label id="txtNombreUbicacion">ubicaciones.nombre</label>)}
               
               {formik.errors.txtNombreUbicacion  &&  <small id="ttxtNombreUbicacion-help" className="p-invalid">
                  {formik.errors.txtNombreUbicacion}
                  </small>}                 
               
            </div>
            
            
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Ubicaciones;                                        	


