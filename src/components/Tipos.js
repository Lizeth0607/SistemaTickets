
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
import TiposService from '../service/TiposService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Tipos = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstTipos, setLstTipos] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgTipos, setDlgTipos] = useState(false);
const [Tipos, setTipos] = useState({id:null
,nombre:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Tipos']);
const [captura, setCaptura] = useState(false);
const tiposService = new TiposService(); //MODIFICAR SERVICES






const tiposSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}




const obtenerTipo= ()   =>   { //MODIFICAR EN SERVICE
   tiposService.obtenerTipo ().then(data => setLstTipos(data));

};

const seleccionaTipo= (pTipos)   =>   {
    setCaptura(false);
    formik.resetForm();
    tiposService.seleccionaTipo (pTipos).then(data => setTipos(data));
    setDlgTipos(true);
};

useEffect(()   =>   {
obtenerTipo();
},  [txtCriterio]);


const agregaTipo = ()   =>   {
   tiposService.agregaTipo (Tipos).then(data => {setTipos(data);
      tiposSuccess('success',t('Tipos:cabecero.exito'),t('Tipos:mensaje.agregar'));
setDlgTipos(false);
obtenerTipo ();
});
};

const eliminaTipo= (pTipos)   =>   {
    tiposService.eliminaTipo (pTipos).then(data => setTipos(data));
   tiposSuccess('success',t('Tipos:cabecero.exito'),t('Tipos:mensaje.eliminar'));
setDlgTipos(false);
obtenerTipo();
obtenerTipo();
};

const actualizaTipo = ()   =>   {
   tiposService.actualizaTipo(Tipos).then(data => { setDlgTipos(false); 
   obtenerTipo();});
};

const updateProperty = (propiedad, valor)   =>  {
let tipoCopy = Object.assign({}, Tipos);
tipoCopy[propiedad] = valor;
setTipos(tipoCopy);
};

const iniciaTipos = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgTipos(true);
};

const iniciaComponentes = ()   =>   {
setTipos({id:null
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
 if (!Tipos.nombre) {
errors.txtNombre= t('Tipos:required.nombre');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaTipo();
} else{
actualizaTipo();
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
   <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaTipo(rowData);} }></Button>
   <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaTipo(rowData); } }></Button>
</div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Tipos:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgTipos(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Tipos:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaTipo }></Button>}                 
         { !captura   &&  <Button tooltip={t('Tipos:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Tipos:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Tipos:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Tipos:placeholder.nombre')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Tipos:boton.agregar')} icon="pi pi-plus" onClick={iniciaTipos}></Button></div>
      </div>
   </div>
   <DataTable value={lstTipos} paginator={true} rows={10} responsive={true}>
      <Column field="id" header={t('Tipos:label.id')} sortable={true}></Column>
      <Column field="nombre" header={t('Tipos:label.nombre')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Tipos:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Tipos:rotulo.agregar')} footer={dlgFooter} visible={dlgTipos} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgTipos(false)} blockScroll={false}>
      { Tipos  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombre">
                  {t('Tipos:label.nombre')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombre" placeholder={t('Tipos:placeholder.nombre')} value={Tipos.nombre} className={formik.errors.txtNombre ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
               ):(     <label id="txtNombre">tipos.nombre</label>)}
               
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
export default Tipos;                                        	


