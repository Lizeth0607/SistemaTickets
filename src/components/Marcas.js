
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
import MarcasService from '../service/MarcasService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Marcas = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstMarcas, setLstMarcas] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgMarcas, setDlgMarcas] = useState(false);
const [Marcas, setMarcas] = useState({idMarca:null
,nombreMarca:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Marcas']);
const [captura, setCaptura] = useState(false);
const marcasService = new MarcasService(); //MODIFICAR SERVICES






const marcasSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}

//TextArea
const [value1, setValue1] = useState('');




const obtenerMarca = ()   =>   { //MODIFICAR EN SERVICE
marcasService.obtenerMarca ().then(data => setLstMarcas(data));

};

const seleccionaMarca = (pCategoria)   =>   {
setCaptura(false);
formik.resetForm();
marcasService.seleccionaMarca (pCategoria).then(data => setMarcas(data));
setDlgMarcas(true);
};

useEffect(()   =>   {
obtenerMarca();
},  [txtCriterio]);


const agregaMarca = ()   =>   {
marcasService.agregaMarca (Marcas).
then(data => {setMarcas(data);
marcasSuccess('success',t('Marcas:cabecero.exito'),t('Marcas:mensaje.agregar'));
setDlgMarcas(false);
obtenerMarca ();
});
};

const eliminaMarca = ()   =>   {
Marcas.eliminaMarca (Marcas);
marcasSuccess('success',t('Marcas:cabecero.exito'),t('Marcas:mensaje.eliminar'));
setDlgMarcas(false);
obtenerMarca();
obtenerMarca();
};

const actualizaMarca = ()   =>   {
marcasService.actualizaMarca(Marcas).
then(data => { setDlgMarcas(false); obtenerMarca();});
};

const updateProperty = (propiedad, valor)   =>  {
let marcaCopy = Object.assign({}, Marcas);
marcaCopy[propiedad] = valor;
setMarcas(marcaCopy);
};

const iniciaMarcas = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgMarcas(true);
};

const iniciaComponentes = ()   =>   {
setMarcas({idMarca:null
   ,nombreMarca:''
});
formik.resetForm();
};

/**
* Validación de las propiedades 
*
*/
const validate = () => {
const errors = {};
 if (!Marcas.nombreMarca) {
errors.txtNombreMarca= t('Marcas:required.nombreMarca');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaMarca();
} else{
actualizaMarca();
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
<div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaMarca(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaMarca(rowData); } }></Button></div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Marcas:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgMarcas(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Marcas:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaMarca }></Button>}                 
         { !captura   &&  <Button tooltip={t('Marcas:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Marcas:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Marcas:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Marcas:placeholder.nombreMarca')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Marcas:boton.agregar')} icon="pi pi-plus" onClick={iniciaMarcas}></Button></div>
      </div>
   </div>
   <DataTable value={lstMarcas} paginator={true} rows={10} responsive={true}>
      <Column field="marca_id" header={t('Marcas:label.idMarca')} sortable={true}></Column>
      <Column field="nombre" header={t('Marcas:label.nombreMarca')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Marcas:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Marcas:rotulo.agregar')} footer={dlgFooter} visible={dlgMarcas} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgMarcas(false)} blockScroll={false}>
      { Marcas  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombreMarca">
                  {t('Marcas:label.nombreMarca')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombreMarca" placeholder={t('Marcas:placeholder.nombreMarca')} value={Marcas.nombreMarca} className={formik.errors.txtNombreMarca ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombreMarca', e.target.value)}></InputText>    
               ):(     <label id="txtNombreMarca">marcas.nombreMarca</label>)}
               
               {formik.errors.txtNombreMarca  &&  <small id="txtNombreMarca-help" className="p-invalid">
                  {formik.errors.txtNombreMarca}
                  </small>}                 
               
            </div>
            
            
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Marcas;                                        	


