
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
import EmpresasService from '../service/EmpresasService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Empresas = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstEmpresas, setLstEmpresas] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgEmpresas, setDlgEmpresas] = useState(false);
const [Empresas, setEmpresas] = useState({id:null
,nombre:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Empresas']);
const [captura, setCaptura] = useState(false);
const empresasService = new EmpresasService(); //MODIFICAR SERVICES






const empresasSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}




const obtenerEmpresa= ()   =>   { //MODIFICAR EN SERVICE
   empresasService.obtenerEmpresa ().then(data => setLstEmpresas(data));

};

const seleccionaEmpresa = (pEmpresas)   =>   {
    setCaptura(false);
    formik.resetForm();
    empresasService.seleccionaEmpresa (pEmpresas).then(data => setEmpresas(data));
    setDlgEmpresas(true);
};

useEffect(()   =>   {
obtenerEmpresa();
},  [txtCriterio]);


const agregaEmpresa = ()   =>   {
   empresasService.agregaEmpresa (Empresas).then(data => {setEmpresas(data);
      empresasSuccess('success',t('Empresas:mensaje.cabecero'),t('Empresas:mensaje.agregar'));
setDlgEmpresas(false);
obtenerEmpresa ();
});
};

const eliminaEmpresa = (pEmpresas)   =>   {
   empresasService.eliminaEmpresa (pEmpresas).then(data => setEmpresas(data));
   empresasSuccess('success',t('Empresas:mensaje.cabecero'),t('Empresas:mensaje.eliminar'));
setDlgEmpresas(false);
obtenerEmpresa();
obtenerEmpresa();
};

const actualizaEmpresa = ()   =>   {
   empresasService.actualizaEmpresa(Empresas).then(data => { setDlgEmpresas(false); obtenerEmpresa();});
   empresasSuccess('success',t('Empresas:mensaje.cabecero'),t('Empresas:mensaje.actualizar'));
   setDlgEmpresas(false);
   obtenerEmpresa();
};

const updateProperty = (propiedad, valor)   =>  {
let empresaCopy = Object.assign({}, Empresas);
empresaCopy[propiedad] = valor;
setEmpresas(empresaCopy);
};

const iniciaEmpresas = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgEmpresas(true);
};

const iniciaComponentes = ()   =>   {
setEmpresas({id:null
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
 if (!Empresas.nombre) {
errors.txtNombre= t('Empresas:required.nombreUbicacion');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaEmpresa();
} else{
actualizaEmpresa();
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
   <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaEmpresa(rowData);} }></Button>
   <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaEmpresa(rowData); } }></Button>
</div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Empresas:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgEmpresas(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Empresas:boton.actualizar')} icon="pi pi-check-circle" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Empresas:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Empresas:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Empresas:placeholder.nombre')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Empresas:boton.agregar')} icon="pi pi-plus" onClick={iniciaEmpresas}></Button></div>
      </div>
   </div>
   <DataTable value={lstEmpresas} paginator={true} rows={10} responsive={true}>
      <Column field="id" header={t('Empresas:label.id')} sortable={true}></Column>
      <Column field="nombre" header={t('Empresas:label.nombre')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Empresas:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Empresas:rotulo.agregar')} footer={dlgFooter} visible={dlgEmpresas} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgEmpresas(false)} blockScroll={false}>
      { Empresas  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombre">
                  {t('Empresas:label.nombre')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombre" placeholder={t('Empresas:placeholder.nombre')} value={Empresas.nombre} className={formik.errors.txtNombre ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
               ):(     <label id="txtNombre">Empresas.nombre</label>)}
               
               {formik.errors.txtNombre  &&  <small id="ttxtNombre-help" className="p-invalid">
                  {formik.errors.txtNombre}
                  </small>}                 
               
            </div>
            
            
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Empresas;                                        	


