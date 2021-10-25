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
import axios from 'axios';

import Moment from 'react-moment';
import 'moment-timezone';
import CategoriasEquiposService from '../service/CategoriasEquiposService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Categorias = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstCategorias, setLstCategorias] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgCategorias, setDlgCategorias] = useState(false);
const [Categorias, setCategorias] = useState({idCategoria:null
,nombre:''
,descripcion:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','CategoriasEquipos']);
const [captura, setCaptura] = useState(false);
const categoriasService = new CategoriasEquiposService(); //MODIFICAR SERVICES







const categoriasSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}

//TextArea
const [value1, setValue1] = useState('');




const obtenerCategoria = ()   =>   { //MODIFICAR EN SERVICE
   categoriasService.obtenerCategoria ().then(data => setLstCategorias(data));
};

const seleccionaCategoria = (pCategoria)   =>   {
setCaptura(false);
formik.resetForm();
categoriasService.seleccionaCategoria (pCategoria).then(data => setCategorias(data));
setDlgCategorias(true);
};

useEffect(()   =>   {
obtenerCategoria();
},  [txtCriterio]);


const agregaCategoria = ()   =>   {
categoriasService.agregaCategoria(Categorias).then(data => {setCategorias(data);
categoriasSuccess('success',t('CategoriasEquipos:mensaje.cabecero'),t('CategoriasEquipos:mensaje.agregar'));
setDlgCategorias(false);
obtenerCategoria ();
});
};

const eliminaCategoria = ()   =>   {
Categorias.eliminaCategoria (Categorias);
categoriasSuccess('success',t('CategoriasEquipos:cabecero.exito'),t('CategoriasEquipos:mensaje.eliminar'));
setDlgCategorias(false);
obtenerCategoria();
obtenerCategoria();
};

const actualizaCategoria = ()   =>   {
categoriasService.actualizaCategoria(Categorias).
then(data => { setDlgCategorias(false); obtenerCategoria();});
};

const updateProperty = (propiedad, valor)   =>  {
let categoriaCopy = Object.assign({}, Categorias);
categoriaCopy[propiedad] = valor;
setCategorias(categoriaCopy);
};

const iniciaCategorias = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgCategorias(true);
};

const iniciaComponentes = ()   =>   {
setCategorias({idCategoria:null
   ,nombre:''
   ,descripcion:''
});
formik.resetForm();
};

/**
* Validación de las propiedades 
*
*/
const validate = () => {
const errors = {};
 if (!Categorias.nombre) {
errors.txtnombre= t('CategoriasEquipos:required.nombre');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaCategoria();
} else{
actualizaCategoria();
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
<div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaCategoria(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaCategoria(rowData); } }></Button></div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('CategoriasEquipos:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgCategorias(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('CategoriasEquipos:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaCategoria }></Button>}                 
         { !captura   &&  <Button tooltip={t('CategoriasEquipos:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('CategoriasEquipos:boton.agregar')} type="button" icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="CategoriasEquipos:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('CategoriasEquipos:placeholder.nombre')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('CategoriasEquipos:boton.agregar')} icon="pi pi-plus" onClick={iniciaCategorias}></Button></div>
      </div>
   </div>
   <DataTable value={lstCategorias} paginator={true} rows={10} responsive={true}>
      <Column field="categoria_id" header={t('CategoriasEquipos:label.idCategoria')} sortable={true}></Column>
      <Column field="nombre" header={t('CategoriasEquipos:label.nombre')} sortable={true}></Column>
      <Column field="descripcion" header={t('CategoriasEquipos:label.descripcion')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('CategoriasEquipos:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('CategoriasEquipos:rotulo.agregar')} footer={dlgFooter} visible={dlgCategorias} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgCategorias(false)} blockScroll={false}>
      { Categorias  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtnombre">
                  {t('CategoriasEquipos:label.nombre')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtnombre" placeholder={t('CategoriasEquipos:placeholder.nombre')} value={Categorias.nombre} className={formik.errors.txtnombre ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
               ):(     <label id="txtnombre">categorias.nombre</label>)}
               
               {formik.errors.txtnombre  &&  <small id="txtnombre-help" className="p-invalid">
                  {formik.errors.txtnombre}
                  </small>}                 
               
            </div>
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtdescripcion">
                  {t('CategoriasEquipos:label.descripcion')}
                  </label>
               {{captura} ? ( 
                <InputTextarea value={Categorias.descripcion} onChange={(e) => setValue1(e.target.value)} rows={4} cols={30}placeholder={t('CategoriasEquipos:placeholder.descripcion')} onChange={(e) =>   updateProperty('descripcion', e.target.value)} />
                ):(     <label id="txtdescripcion">categorias.descripcion</label>)}
               
            </div>
                
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Categorias;