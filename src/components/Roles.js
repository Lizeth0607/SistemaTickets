
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
import RolesService from '../service/RolesService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Roles = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstRoles, setLstRoles] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgRoles, setDlgRoles] = useState(false);
const [Roles, setRoles] = useState({rol_id:null
,nombreRol:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Roles']);
const [captura, setCaptura] = useState(false);
const rolesService = new RolesService(); //MODIFICAR SERVICES






const rolesSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}

//TextArea
const [value1, setValue1] = useState('');




const obtenerRol = ()   =>   { //MODIFICAR EN SERVICE
    rolesService.obtenerRol ().then(data => setLstRoles(data));

};

const seleccionaRol = (pRoles)   =>   {
    setCaptura(false);
    formik.resetForm();
    rolesService.seleccionaRol (pRoles).then(data => setRoles(data));
    setDlgRoles(true);
};

useEffect(()   =>   {
obtenerRol();
},  [txtCriterio]);


const agregaRol = ()   =>   {
rolesService.agregaRol (Roles).then(data => {setRoles(data);
rolesSuccess('success',t('Roles:cabecero.exito'),t('Roles:mensaje.agregar'));
setDlgRoles(false);
obtenerRol ();
});
};

const eliminaRol = (pRoles)   =>   {
rolesService.eliminaRol (pRoles).then(data => setRoles(data));
rolesSuccess('success',t('Roles:cabecero.exito'),t('Roles:mensaje.eliminar'));
setDlgRoles(false);
obtenerRol();
obtenerRol();
};

const actualizaRol = ()   =>   {
rolesService.actualizaRol(Roles).
then(data => { setDlgRoles(false); obtenerRol();});
};

const updateProperty = (propiedad, valor)   =>  {
let rolCopy = Object.assign({}, Roles);
rolCopy[propiedad] = valor;
setRoles(rolCopy);
};

const iniciaRoles = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgRoles(true);
};

const iniciaComponentes = ()   =>   {
setRoles({rol_id:null
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
 if (!Roles.nombre) {
errors.txtNombreRol= t('Roles:required.nombreRol');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaRol();
} else{
actualizaRol();
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
   <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaRol(rowData);} }></Button>
   <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaRol(rowData); } }></Button>
</div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Roles:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgRoles(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Roles:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaRol }></Button>}                 
         { !captura   &&  <Button tooltip={t('Roles:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Roles:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Roles:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Roles:placeholder.nombreRol')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Roles:boton.agregar')} icon="pi pi-plus" onClick={iniciaRoles}></Button></div>
      </div>
   </div>
   <DataTable value={lstRoles} paginator={true} rows={10} responsive={true}>
      <Column field="rol_id" header={t('Roles:label.idRol')} sortable={true}></Column>
      <Column field="nombre" header={t('Roles:label.nombreRol')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Roles:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Roles:rotulo.agregar')} footer={dlgFooter} visible={dlgRoles} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgRoles(false)} blockScroll={false}>
      { Roles  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombreRol">
                  {t('Roles:label.nombreRol')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombreRol" placeholder={t('Roles:placeholder.nombreRol')} value={Roles.nombre} className={formik.errors.nombre ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
               ):(     <label id="txtNombreRol">roles.nombreRol</label>)}
               
               {formik.errors.txtNombreRol  &&  <small id="txtNombreRol-help" className="p-invalid">
                  {formik.errors.txtNombreRol}
                  </small>}                 
               
            </div>
            
            
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Roles;                                        	


