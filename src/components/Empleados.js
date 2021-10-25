
import React, {  useEffect, useState, useRef } from 'react';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

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
import { AutoComplete } from 'primereact/autocomplete';

import Moment from 'react-moment';
import 'moment-timezone';
import EmpleadosService from '../service/EmpleadosService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';
import  SedesDatosService  from '../service/SedesDatosService';
import  UbicacionesDatosService  from '../service/UbicacionesDatosService';


const Empleados = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstEmpleados, setLstEmpleados] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgEmpleados, setDlgEmpleados] = useState(false);
const [Empleados, setEmpleados] = useState({idEmpleado:null
   ,nombreEmpleado:''
   ,telefonoEmpleado:''
   ,correoEmpleado:''
   ,puestoEmpleado:''
   ,idUbicacion:''
   ,idSede:''
   ,imagenperfil:''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Empleados']);
const [captura, setCaptura] = useState(false);
const empleadosService = new EmpleadosService(); //MODIFICAR SERVICES

//imagen
const toast = useRef(null);
const onUpload = () => {
   toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
}



    

    
//Autocomplete
const [ubicaciones, setUbicaciones] = useState([]);
const [selectedUbicaciones, setSelectedUbicaciones] = useState(null);
const [filteredUbicaciones, setFilteredUbicaciones] = useState(null);
const ubicacionesDatosService = new UbicacionesDatosService();


const items = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));

useEffect(() => {
    ubicacionesDatosService.getUbicaciones().then(data => setUbicaciones(data));
}, []); 

const searchUbicacion = (event) => {
    setTimeout(() => {
        let _filteredUbicaciones;
        if (!event.query.trim().length) {
            _filteredUbicaciones = [...ubicaciones];
        }
        else {
            _filteredUbicaciones = ubicaciones.filter((country) => {
                return ubicaciones.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilteredUbicaciones(_filteredUbicaciones);
    }, 250);
}
const itemTemplate = (item) => {
   return (
       <div className="ubicacion-item">
           <div>{item.name}</div>
       </div>
   );
}

//Autocomplete 2
const [sedes, setSedes] = useState([]);
const [selectedSedes, setSelectedSedes] = useState(null);
const [filteredSedes, setFilteredSedes] = useState(null);
const sedesDatosService = new SedesDatosService();


const itemsSede = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));

useEffect(() => {
    sedesDatosService.getSedes().then(data => setSedes(data));
}, []); 

const searchSede = (event) => {
    setTimeout(() => {
        let _filteredSedes;
        if (!event.query.trim().length) {
            _filteredSedes = [...sedes];
        }
        else {
            _filteredSedes = sedes.filter((country) => {
                return sedes.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilteredSedes(_filteredSedes);
    }, 250);
}


    

const itemTemplateSedes = (item) => {
    return (
        <div className="sede-item">
            <div>{item.name}</div>
        </div>
    );
}






const empleadosSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}


const obtenerEmpleado = ()   =>   { //MODIFICAR EN SERVICE
empleadosService.obtenerEmpleado ().then(data => setLstEmpleados(data));
};

const seleccionaEmpleado = (pEmpleados)   =>   {
setCaptura(false);
formik.resetForm();
empleadosService.seleccionaEmpleado (pEmpleados).then(data => setEmpleados(data));
setDlgEmpleados(true);
};

useEffect(()   =>   {
obtenerEmpleado();
},  [txtCriterio]);


const agregaEmpleado = ()   =>   {
empleadosService.agregaEmpleado (Empleados).
then(data => {setEmpleados(data);
empleadosSuccess('success',t('Empleados:cabecero.exito'),t('Empleados:mensaje.agregar'));
setDlgEmpleados(false);
obtenerEmpleado ();
});
};

const eliminaEmpleado = ()   =>   {
Empleados.eliminaEmpleado (Empleados);
empleadosSuccess('success',t('Empleados:cabecero.exito'),t('Empleados:mensaje.eliminar'));
setDlgEmpleados(false);
obtenerEmpleado();
obtenerEmpleado();
};

const actualizaEmpleado = ()   =>   {
empleadosService.actualizaEmpleado (Empleados).
then(data => { setDlgEmpleados(false); obtenerEmpleado();});
};

const updateProperty = (propiedad, valor)   =>  {
let empleadoCopy = Object.assign({}, Empleados);
empleadoCopy[propiedad] = valor;
setEmpleados(empleadoCopy);
};

const iniciaEmpleados = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgEmpleados(true);
};

const iniciaComponentes = ()   =>   {
setEmpleados({idEmpleado:null
   ,nombreEmpleado:''
   ,telefonoEmpleado:''
   ,correoEmpleado:''
   ,puestoEmpleado:''
   ,idUbicacion:''
   ,idSede:''
   ,imagenPerfil:''
});
formik.resetForm();
};

/**
* Validación de las propiedades 
*
*/
const validate = () => {
const errors = {};
 if (!Empleados.nombreEmpleado) {
errors.txtNombreEmpleado= t('Empleados:required.nombreEmpleado');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaEmpleado();
} else{
actualizaEmpleado();
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
<div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaEmpleado(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaEmpleado(rowData); } }></Button></div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Empleados:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgEmpleados(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Empleados:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaEmpleado }></Button>}                 
         { !captura   &&  <Button tooltip={t('Empleados:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Empleados:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Empleados:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Empleados:placeholder.idEmpleado')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Empleados:boton.agregar')} icon="pi pi-plus" onClick={iniciaEmpleados}></Button></div>
      </div>
   </div>
   <DataTable value={lstEmpleados} paginator={true} rows={10} responsive={true}>
   <Column field="imagen" header={t('Empleados:label.imagenPerfil')} sortable={true}></Column>
      <Column field="empleado_id" header={t('Empleados:label.idEmpleado')} sortable={true}></Column>
      <Column field="nombre" header={t('Empleados:label.nombreEmpleado')} sortable={true}></Column>
      <Column field="telefono" header={t('Empleados:label.telefonoEmpleado')} sortable={true}></Column>
      <Column field="mail" header={t('Empleados:label.correoEmpleado')} sortable={true}></Column>
      <Column field="puesto" header={t('Empleados:label.puestoEmpleado')} sortable={true}></Column>
      <Column field="ubicacion_id" header={t('Empleados:label.idUbicacion')} sortable={true}></Column>
      <Column field="sede_id" header={t('Empleados:label.idSede')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Empleados:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Empleados:rotulo.agregar')} footer={dlgFooter} visible={dlgEmpleados} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgEmpleados(false)} blockScroll={false}>
      { Empleados  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombreEmpleado">
                  {t('Empleados:label.nombreEmpleado')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtNombreEmpleado" placeholder={t('Empleados:placeholder.nombreEmpleado')} value={Empleados.nombreEmpleado} className={formik.errors.txtNombreEmpleado ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombreEmpleado', e.target.value)}></InputText>    
               ):(     <label id="txtNombreEmpleado">empleados.nombreEmpleado</label>)}
               
               {formik.errors.txtNombreEmpleado  &&  <small id="txtNombreEmpleado-help" className="p-invalid">
                  {formik.errors.txtNombreEmpleado}
                  </small>}                 
               
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtTelefonoEmpleado">
                  {t('Empleados:label.telefonoEmpleado')}
                  </label>
               {{captura} ? ( 
                  <InputText id="txtTelefonoEmpleado" placeholder={t('Empleados:placeholder.telefonoEmpleado')} value={Empleados.telefonoEmpleado} className={formik.errors.txtTelefonoEmpleado ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('telefonoEmpleado', e.target.value)}></InputText>    
                  ):(     <label id="txtTelefonoEmpleado">empleados.telefonoEmpleado</label>)}
                  
            </div>
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtCorreoEmpleado">
                  {t('Empleados:label.correoEmpleado')}
                  </label>
               {{captura} ? ( 
                   <InputText id="txtCorreoEmpleado" placeholder={t('Empleados:placeholder.correoEmpleado')} value={Empleados.correoEmpleado} className={formik.errors.txtCorreoEmpleado ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('correoEmpleado', e.target.value)}></InputText>    
                   ):(     <label id="txtCorreoEmpleado">empleados.correoEmpleado</label>)}
                   
            </div>   
           
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtPuestoEmpleado">
                  {t('Empleados:label.puestoEmpleado')}
                  </label>
               {{captura} ? ( 
                   <InputText id="txtPuestoEmpleado" placeholder={t('Empleados:placeholder.puestoEmpleado')} value={Empleados.puestoEmpleado} className={formik.errors.txtPuestoEmpleado ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('puestoEmpleado', e.target.value)}></InputText>    
                   ):(     <label id="txtLicenciaEquipo">equipos.licenciaEquipo</label>)}
            </div>   
            

            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtIdUbicacion">
                  {t('Empleados:label.idUbicacion')}
                  </label>
               {{captura} ? ( 
            <AutoComplete value={selectedUbicaciones} suggestions={filteredUbicaciones} completeMethod={searchUbicacion} placeholder={t('Empleados:placeholder.idUbicacion')} field="name" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setSelectedUbicaciones(e.value)}  />
            ):(     <label id="txtIdUbicacion">empleados.idUbicacion</label>)}
               
            </div>    
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtIdSede">
                  {t('Empleados:label.idSede')}
                  </label>
               {{captura} ? ( 
            <AutoComplete value={selectedSedes} suggestions={filteredSedes} completeMethod={searchSede} placeholder={t('Empleados:placeholder.idSede')} field="name" dropdown forceSelection itemTemplate={itemTemplateSedes} onChange={(e) => setSelectedSedes(e.value)}  />
            ):(     <label id="txtIdSede">empleados.idUbicacion</label>)}
               
            </div> 
            

         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Empleados;                                        	
/*
<div className="p-field p-col-12 p-md-6"><label htmlFor="txtImagenPerfil">
                  {t('Empleados:label.imagenPerfil')}
                  </label>
               {{captura} ? ( 
            <FileUpload mode="basic" name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
            ):(     <label id="txtImagenPerfil">empleados.imagenPerfil</label>)}
               
            </div> */
