
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
import SedesService from '../service/SedesService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Sedes = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstSedes, setLstSedes] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgSedes, setDlgSedes] = useState(false);
const [Sedes, setSedes] = useState({sede_id:null
,nombreRol:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Sedes']);
const [captura, setCaptura] = useState(false);
const sedesService = new SedesService(); //MODIFICAR SERVICES






const sedesSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}

//TextArea
const [value1, setValue1] = useState('');




const obtenerSede = ()   =>   { //MODIFICAR EN SERVICE
    sedesService.obtenerSede ().then(data => setLstSedes(data));

};

const seleccionaSede = (pSedes)   =>   {
    setCaptura(false);
    formik.resetForm();
    sedesService.seleccionaRol (pSedes).then(data => setSedes(data));
    setDlgSedes(true);
};

useEffect(()   =>   {
obtenerSede();
},  [txtCriterio]);


const agregaSede = ()   =>   {
sedesService.agregaSede (Sedes).then(data => {setSedes(data);
sedesSuccess('success',t('Sedes:cabecero.exito'),t('Sedes:mensaje.agregar'));
setDlgSedes(false);
obtenerSede ();
});
};

const eliminaSede = (pSedes)   =>   {
sedesService.eliminaSede (pSedes).then(data => setSedes(data));
sedesSuccess('success',t('Sedes:cabecero.exito'),t('Sedes:mensaje.eliminar'));
setDlgSedes(false);
obtenerSede();
obtenerSede();
};

const actualizaSede = ()   =>   {
sedesService.actualizaSede(Sedes).
then(data => { setDlgSedes(false); obtenerSede();});
};

const updateProperty = (propiedad, valor)   =>  {
let sedeCopy = Object.assign({}, Sedes);
sedeCopy[propiedad] = valor;
setSedes(sedeCopy);
};

const iniciaSedes = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgSedes(true);
};

const iniciaComponentes = ()   =>   {
setSedes({sede_id:null
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
 if (!Sedes.nombre) {
errors.txtNombreSede= t('Sedes:required.nombreSede');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaSede();
} else{
actualizaSede();
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
   <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaSede(rowData);} }></Button>
   <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaSede(rowData); } }></Button>
</div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Sedes:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgSedes(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Sedes:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaSede }></Button>}                 
         { !captura   &&  <Button tooltip={t('Sedes:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Sedes:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Sedes:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Sedes:placeholder.nombreSede')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Sedes:boton.agregar')} icon="pi pi-plus" onClick={iniciaSedes}></Button></div>
      </div>
   </div>
   <DataTable value={lstSedes} paginator={true} rows={10} responsive={true}>
      <Column field="sede_id" header={t('Sedes:label.idSede')} sortable={true}></Column>
      <Column field="nombre" header={t('Sedes:label.nombreSede')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Sedes:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Sedes:rotulo.agregar')} footer={dlgFooter} visible={dlgSedes} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgSedes(false)} blockScroll={false}>
      { Sedes  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombreSede">
                  {t('Sedes:label.nombreSede')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombreSede" placeholder={t('Sedes:placeholder.nombreSede')} value={Sedes.nombre} className={formik.errors.txtNombreSede ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
               ):(     <label id="txtNombreSede">sedes.nombre</label>)}
               
               {formik.errors.txtNombreSede  &&  <small id="txtNombreSede-help" className="p-invalid">
                  {formik.errors.txtNombreSede}
                  </small>}                 
               
            </div>
            
            
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Sedes;                                        	


