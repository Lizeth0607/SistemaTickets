
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
import IndicadoresService from '../service/IndicadoresService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Indicadores = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstIndicadores, setLstIndicadores] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgIndicadores, setDlgIndicadores] = useState(false);
const [Indicadores, setIndicadores] = useState({idInd:null
,nombreInd:''
,unidad_medida:''
,categoria:''
});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Indicadores']);
const [captura, setCaptura] = useState(false);
const indicadoresService = new IndicadoresService(); //MODIFICAR SERVICES
const [selectedUM, setSelectedUM] = useState(null);
const [selectedCategoria, setSelectedCategoria] = useState(null);
const unidad_med = [
   { name: 'UnidadMedida1', code: 'UM1' },
   { name: 'UnidadMedida2', code: 'UM2' },
   { name: 'UnidadMedida3', code: 'UM3' },
   { name: 'UnidadMedida4', code: 'UM4' },
   { name: 'UnidadMedida5', code: 'UM5' }
];
const categorias = [
   { name: 'Categoria1', code: 'C1' },
   { name: 'Categoria2', code: 'C2' },
   { name: 'Categoria3', code: 'C3' },
   { name: 'Categoria4', code: 'C4' },
   { name: 'Categoria5', code: 'C5' }
];
const onUnidadMedChange = (e) => {
   setSelectedUM(e.value);
}
const onCategoriaChange = (e) => {
   setSelectedCategoria(e.value);
}





const indicadoresSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}


const obtenerIndicador = ()   =>   { //MODIFICAR EN SERVICE
indicadoresService.obtenerIndicador (txtCriterio).then(data => setLstIndicadores(data));
};

const seleccionaIndicador = (pIndicador)   =>   {
setCaptura(false);
formik.resetForm();
indicadoresService.seleccionaIndicador (pIndicador).then(data => setIndicadores(data));
setDlgIndicadores(true);
};

useEffect(()   =>   {
obtenerIndicador();
},  [txtCriterio]);


const agregaIndicador = ()   =>   {
indicadoresService.agregaIndicador (Indicadores).
then(data => {setIndicadores(data);
indicadoresSuccess('success',t('Indicadores:cabecero.exito'),t('Indicadores:mensaje.agregar'));
setDlgIndicadores(false);
obtenerIndicador ();
});
};

const eliminaIndicador = ()   =>   {
Indicadores.eliminaIndicador (Indicadores);
indicadoresSuccess('success',t('Inidcadores:cabecero.exito'),t('Indicadores:mensaje.eliminar'));
setDlgIndicadores(false);
obtenerIndicador();
obtenerIndicador();
};

const actualizaIndicador = ()   =>   {
indicadoresService.actualizaIndicador (Indicadores).
then(data => { setDlgIndicadores(false); obtenerIndicador();});
};

const updateProperty = (propiedad, valor)   =>  {
let indicadorCopy = Object.assign({}, Indicadores);
indicadorCopy[propiedad] = valor;
setIndicadores(indicadorCopy);
};

const iniciaIndicadores = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgIndicadores(true);
};

const iniciaComponentes = ()   =>   {
setIndicadores({idInd:null
   ,nombreInd:''
   ,unidad_medida:''
   ,categoria:''
});
formik.resetForm();
};

/**
* Validación de las propiedades
*
*/
const validate = () => {
const errors = {};
 if (!Indicadores.nombreInd) {
errors.txtNombreInd= t('Indicadores:required.nombreInd');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaIndicador();
} else{
actualizaIndicador();
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
<div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaIndicador(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaIndicador(rowData); } }></Button></div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Indicadores:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgIndicadores(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Indicadores:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaIndicador }></Button>}                 
         { !captura   &&  <Button tooltip={t('Indicadores:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Indicadores:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Indicadores:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Indicadores:placeholder.nombreInd')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Indicadores:boton.agregar')} icon="pi pi-plus" onClick={iniciaIndicadores}></Button></div>
      </div>
   </div>
   <DataTable value={lstIndicadores} paginator={true} rows={10} responsive={true}>
      <Column field="idInd" header={t('Indicadores:label.idInd')} sortable={true}></Column>
      <Column field="nombreInd" header={t('Indicadores:label.nombreInd')} sortable={true}></Column>
      <Column field="unidadMedida" header={t('Indicadores:label.unidadMedida')} sortable={true}></Column>
      <Column field="Categoria" header={t('Indicadores:label.categoria')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Indicadores:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Indicadores:rotulo.agregar')} footer={dlgFooter} visible={dlgIndicadores} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgIndicadores(false)} blockScroll={false}>
      { Indicadores  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtNombreInd">
                  {t('Indicadores:label.nombreInd')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombreInd" placeholder={t('Indicadores:placeholder.nombreInd')} value={Indicadores.nombreInd} className={formik.errors.txtNombreInd ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombreInd', e.target.value)}></InputText>    
               ):(     <label id="txtNombreInd">indicadores.nombreInd</label>)}
               
               {formik.errors.txtNombreInd  &&  <small id="txtNombreInd-help" className="p-invalid">
                  {formik.errors.txtNombreInd}
                  </small>}                 
               
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtUniMed">
                  {t('Indicadores:label.unidadMedida')}
                  </label>
               {{captura} ? ( 
                  <Dropdown value={selectedUM} options={unidad_med} onChange={onUnidadMedChange} optionLabel="name" placeholder={t('Indicadores:placeholder.unidadMedida')} onChange={(e) =>   updateProperty('unidadMedida', e.target.value)}/>
               ):(     <label id="txtUniMed">indicadores.unidad_med</label>)}
               
            </div>
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtIndCateg">
                  {t('Indicadores:label.categoria')}
                  </label>
               {{captura} ? ( 
                  <Dropdown value={selectedCategoria} options={categorias} onChange={onCategoriaChange} optionLabel="name" placeholder={t('Indicadores:placeholder.categoria')} onChange={(e) =>   updateProperty('categoria', e.target.value)} />               
                  ):(     <label id="txtIndCateg">indicadores.categoria</label>)}
               
            </div>            
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Indicadores;                                        	


