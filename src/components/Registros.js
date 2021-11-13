import React, {  useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2';
import 'moment-timezone';
import RegistrosService from '../service/RegistrosService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';


const Registros = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstRegistros, setLstRegistros] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgRegistros, setDlgRegistros] = useState(false);
const [Registros, setRegistros] = useState({id:null
,nombre:''
, password:''
});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Registros']);
const [captura, setCaptura] = useState(false);
const registrosService = new RegistrosService(); //MODIFICAR SERVICES

const registrosSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}

const obtenerRegistro = ()   =>   { //MODIFICAR EN SERVICE
   registrosService.obtenerRegistro ().then(data => setLstRegistros(data));
};

useEffect(()   =>   {
obtenerRegistro();
},  [txtCriterio]);

const agregaRegistro = ()   =>   {
registrosService.agregaRegistro (Registros).
then(data => {setRegistros(data);
registrosSuccess('success',t('Registros:cabecero.exito'),t('Registros:mensaje.agregar'));
setDlgRegistros(false);
obtenerRegistro ();
});
};

const updateProperty = (propiedad, valor)   =>  {
let registroCopy = Object.assign({}, Registros);
registroCopy[propiedad] = valor;
setRegistros(registroCopy);
};

const iniciaRegistros = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgRegistros(true);
};

const iniciaComponentes = ()   =>   {
setRegistros({ID:null
   ,nombre:''
   ,password:''
});
formik.resetForm();
};

const validate = () => {
const errors = {};
 if (!Registros.nombre||!Registros.password) {
   errors.txtNombre= t('Registros:required.nombre');
   errors.txtPassword= t('Registros:required.password');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
   agregaRegistro();
} 
},
});

const rightFooter = (
<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Registros:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgRegistros(false) }></Button>                 
        { captura   &&  <Button tooltip={t('Registros:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                  
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 
return (
<div>
   <h1>
      <Trans i18nKey="Registros:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
         <Button icon="pi pi-ticket" onClick={iniciaRegistros}></Button></div>
      </div>
   </div>
   <Dialog header={t('Registros:rotulo.agregar')} footer={dlgFooter} visible={dlgRegistros} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgRegistros(false)} blockScroll={false}>
      { Registros  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombre">
                  {t('Registros:label.nombre')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombre" placeholder={t('Registros:placeholder.nombre')} value={Registros.nombre} className={formik.errors.txtNombre ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
               ):(     <label id="txtNombre">registros.nombre</label>)}
               
               {formik.errors.txtNombre  &&  <small id="txtNombre-help" className="p-invalid">
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
export default Registros;                                        	


