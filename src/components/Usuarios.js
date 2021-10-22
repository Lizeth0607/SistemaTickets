
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
import UsuariosService from '../service/UsuariosService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';



const Usuarios = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstUsuarios, setLstUsuarios] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgUsuarios, setDlgUsuarios] = useState(false);
const [Usuarios, setUsuarios] = useState({idUsuario:null
,nombreUsu:''
,cveUsuario:''
,rolUsu:''
});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Usuarios']);
const [captura, setCaptura] = useState(false);
const usuariosService = new UsuariosService(); //MODIFICAR SERVICES

const [selectedRol, setSelectedRol] = useState(null);

const roles = [
   { name: 'Rol1', code: 'R1' },
   { name: 'Rol2', code: 'R2' },
   { name: 'Rol3', code: 'R3' },
   { name: 'Rol4', code: 'R4' },
   { name: 'Rol5', code: 'R5' }
];

const onRolChange = (e) => {
   setSelectedRol(e.value);
}





const usuariosSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}


const obtenerUsuario = ()   =>   { //MODIFICAR EN SERVICE
usuariosService.obtenerUsuario (txtCriterio).then(data => setLstUsuarios(data));
};

const seleccionaUsuario = (pUsuario)   =>   {
setCaptura(false);
formik.resetForm();
usuariosService.seleccionaUsuario (pUsuario).then(data => setUsuarios(data));
setDlgUsuarios(true);
};

useEffect(()   =>   {
obtenerUsuario();
},  [txtCriterio]);


const agregaUsuario = ()   =>   {
usuariosService.agregaUsuario (Usuarios).
then(data => {setUsuarios(data);
usuariosSuccess('success',t('Usuarios:cabecero.exito'),t('Usuarios:mensaje.agregar'));
setDlgUsuarios(false);
obtenerUsuario ();
});
};

const eliminaUsuario = ()   =>   {
Usuarios.eliminaUsuario (Usuarios);
usuariosSuccess('success',t('Usuarios:cabecero.exito'),t('Usuarios:mensaje.eliminar'));
setDlgUsuarios(false);
obtenerUsuario();
obtenerUsuario();
};

const actualizaUsuario = ()   =>   {
usuariosService.actualizaUsuario (Usuarios).
then(data => { setDlgUsuarios(false); obtenerUsuario();});
};

const updateProperty = (propiedad, valor)   =>  {
let indicadorCopy = Object.assign({}, Usuarios);
indicadorCopy[propiedad] = valor;
setUsuarios(indicadorCopy);
};

const iniciaUsuarios = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgUsuarios(true);
};

const iniciaComponentes = ()   =>   {
setUsuarios({idUsuario:null
   ,nombreUsu:''
   ,cveUsuario:''
   ,rolUsu:''
});
formik.resetForm();
};

/**
* Validación de las propiedades 
*
*/
const validate = () => {
const errors = {};
 if (!Usuarios.idUsuario) {
errors.txtIdUsuario= t('Usuarios:required.idUsuario');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaUsuario();
} else{
actualizaUsuario();
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
<div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaUsuario(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaUsuario(rowData); } }></Button></div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Usuarios:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgUsuarios(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Usuarios:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaUsuario }></Button>}                 
         { !captura   &&  <Button tooltip={t('Usuarios:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Usuarios:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Usuarios:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Usuarios:placeholder.nombreUsu')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Usuarios:boton.agregar')} icon="pi pi-plus" onClick={iniciaUsuarios}></Button></div>
      </div>
   </div>
   <DataTable value={lstUsuarios} paginator={true} rows={10} responsive={true}>
      <Column field="idUsuario" header={t('Usuarios:label.idUsuario')} sortable={true}></Column>
      <Column field="nombreUsu" header={t('Usuarios:label.nombreUsu')} sortable={true}></Column>
      <Column field="cveUsuario" header={t('Usuarios:label.cveUsuario')} sortable={true}></Column>
      <Column field="rolUsu" header={t('Usuarios:label.rolUsu')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Usuarios:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Usuarios:rotulo.agregar')} footer={dlgFooter} visible={dlgUsuarios} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgUsuarios(false)} blockScroll={false}>
      { Usuarios  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtNombreIdUsuario">
                  {t('Usuarios:label.idUsuario')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtidUsuario" placeholder={t('Usuarios:placeholder.idUsuario')} value={Usuarios.idUsuario} className={formik.errors.txtIdUsuario ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('idUsuario', e.target.value)}></InputText>    
               ):(     <label id="txtIdUsuario">Usuarios.idUsuario</label>)}
               
               {formik.errors.txtIdUsuario  &&  <small id="txtIdUsuario-help" className="p-invalid">
                  {formik.errors.txtIdUsuario}
                  </small>}                 
               
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtActivo">
                  {t('Usuarios:label.nombreUsu')}
                  </label>
               {{captura} ? ( 
                  <InputText id="txtNombreUsu" placeholder={t('Usuarios:placeholder.nombreUsu')} value={Usuarios.nombreUsu} className={formik.errors.txtNombreUsu ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombreUsu', e.target.value)}></InputText>    
                  ):(     <label id="txtNombreUsu">Usuarios.nombreUsu</label>)}
                  
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtCveUsuario">
                  {t('Usuarios:label.cveUsuario')}
                  </label>
               {{captura} ? ( 
                  <InputText id="txtCveUsuario" placeholder={t('Usuarios:placeholder.cveUsuario')} value={Usuarios.cveUsuario} className={formik.errors.txtCveUsuario ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('cveUsuario', e.target.value)}></InputText>    
                  ):(     <label id="txtCveUsuario">Usuarios.cveUsuario</label>)}
                  
            </div>
            <div className="p-field p-col-6 p-md-6"><label htmlFor="txtRolesUsu">
                  {t('Usuarios:label.rolUsu')}
                  </label>
               {{captura} ? ( 
                  <Dropdown value={selectedRol} options={roles} onChange={onRolChange} optionLabel="name" placeholder={t('Usuarios:placeholder.rolUsu')} onChange={(e) =>   updateProperty('rolUsu', e.target.value)} />               
                  ):(     <label id="txtRolesUsu">Usuarios.RolesUsu</label>)}
               
            </div>            
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Usuarios;                                        	


