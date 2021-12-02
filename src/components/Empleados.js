import { classNames } from "primereact/utils";
import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

import { useTranslation, Trans } from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';


const Empleados = () => {
   const [mensaje, setMensaje] = useState({
      title: '',
      text: '',
      icon: '',
      confirmButtonText: 'Aceptar',
      timer: '3000'
   });


   const [lstEmpleados, setLstEmpleados] = useState([]);
   const [errores, setErrores] = useState([]);
   const [dlgEmpleados, setDlgEmpleados] = useState(false);
   const [Empleados, setEmpleados] = useState({
      num_empleado: ''
      , nombre: ''
      , apellidos: ''
      , puesto: ''
      , area: ''
      , id_equipo: ''

   });

   const [txtCriterio, setTxtCriterio] = useState('');
   const { t } = useTranslation(['translation', 'Empleados']);
   const [captura, setCaptura] = useState(false);
   const empleadosService = new EmpleadosService(); //MODIFICAR SERVICES

   const empleadosSuccess = (severidad, cabecero, detalle) => {
      let mensajeCopy = Object.assign({}, mensaje);
      mensajeCopy['title'] = cabecero;
      mensajeCopy['text'] = detalle;
      mensajeCopy['icon'] = severidad;
      setMensaje(mensajeCopy);
      Swal.fire(mensajeCopy);
   }


   const obtenerEmpleado = () => { //MODIFICAR EN SERVICE
      empleadosService.obtenerEmpleado().then(data => setLstEmpleados(data));
   };

   const seleccionaEmpleado = (pEmpleados) => {
      console.log(pEmpleados);
      setCaptura(false);
      setEmpleados(pEmpleados);
      empleadosService.seleccionaEmpleado(pEmpleados).then(data=>{})
      setDlgEmpleados(true);
   };

   useEffect(() => {
      obtenerEmpleado();
   }, [txtCriterio]);


   const agregaEmpleado = () => {
      empleadosService.agregaEmpleado(Empleados).then(data => {
         setEmpleados(data);
         empleadosSuccess('success', t('Empleados:cabecero.exito'), t('Empleados:mensaje.agregar'));
         setDlgEmpleados(false);
         obtenerEmpleado();
      });
   };

   const eliminaEmpleado = (pEmpleados) => {
      empleadosService.eliminaEmpleado(pEmpleados).then(data => setEmpleados(data));
      empleadosSuccess('success', t('Empleados:cabecero.exito'), t('Empleados:mensaje.eliminar'));
      setDlgEmpleados(false);
      obtenerEmpleado();
      obtenerEmpleado();
      obtenerEmpleado();
   };

   const actualizaEmpleado = () => {
      empleadosService.actualizaEmpleado(Empleados).then(data => { setDlgEmpleados(false); obtenerEmpleado(); });
      obtenerEmpleado();
   };

   const updateProperty = (propiedad, valor) => {
      let empleadoCopy = Object.assign({}, Empleados);
      empleadoCopy[propiedad] = valor;
      setEmpleados(empleadoCopy);
   };

   const iniciaEmpleados = () => {
      setCaptura(true);
      iniciaComponentes();
      setDlgEmpleados(true);
   };

   const iniciaComponentes = () => {
      setEmpleados({
          num_empleado: ''
         , nombre: ''
         , apellidos: ''
         , puesto: ''
         , area: ''
         , id_equipo: ''
      });
      formik.resetForm();
   };

   const { control, formState: { errors }, handleSubmit, reset, clearErrors, setValue, } = useForm();

   /**
   * Validación de las propiedades 
   *
   */
   const validate = () => {
      const errors = {};
      if (!Empleados.nombre) {
         errors.txtNombreEmpleado = t('Empleados:required.nombreEmpleado');
      }
      return errors;
   };


   const onSubmit = (data) => {
      let discapacidadCopy = Object.assign({}, data);
      if (captura) {
         agregaEmpleado(discapacidadCopy);
      } else {
         actualizaEmpleado(discapacidadCopy);
      }
      reset();
   };

   const formik = useFormik({
      initialValues: {},
      validate,
      onSubmit: (Empleados) => {
          let empleadoCopy = Object.assign({}, Empleados);
          if (captura) {
             agregaEmpleado();
          } else {
             actualizaEmpleado(empleadoCopy);
          }
       },
   });

   const actionTemplate = (rowData, column) => {
      return (
         <div>
            <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={() => { eliminaEmpleado(rowData); }}></Button>
            <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={() => { seleccionaEmpleado(rowData); }}></Button>
         </div>);
   }

   const rightFooter = (

      <div className="p-grid p-fluid">
         <div className="p-col-12">
            <div className="p-inputgroup"><Button tooltip={t('Empleados:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={() => setDlgEmpleados(false)}></Button>
               {!captura && <Button tooltip={t('Empleados:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaEmpleado}></Button>}
               {!captura && <Button tooltip={t('Empleados:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}
               {captura && <Button tooltip={t('Empleados:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}

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
                  <InputText placeholder={t('Empleados:placeholder.idEmpleado')} value={Empleados.empleado_id} onChange={(e) => setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Empleados:boton.agregar')} icon="pi pi-plus" onClick={iniciaEmpleados}></Button></div>
            </div>
         </div>
         <DataTable value={lstEmpleados} paginator={true} rows={10} responsive={true}>
            <Column field="id" header={t('Empleados:label.id')} sortable={true}></Column>
            <Column field="nombre" header={t('Empleados:label.nombre')} sortable={true}></Column>
            <Column field="apellidos" header={t('Empleados:label.apellidos')} sortable={true}></Column>
            <Column field="puesto" header={t('Empleados:label.puesto')} sortable={true}></Column>
            <Column field="area" header={t('Empleados:label.area')} sortable={true}></Column>
            <Column field="S/N" header={t('Empleados:label.equipo')} sortable={true}></Column>

            <Column body={actionTemplate} header={t('Empleados:rotulo.editar')}></Column>

         </DataTable>
         <Dialog header={t('Empleados:rotulo.agregar')} visible={dlgEmpleados} modal={true} style={{ width: '50vw' }} onHide={(e) => setDlgEmpleados(false)} blockScroll={false}>
            {Empleados &&
               <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="p-fluid p-formgrid p-grid">
                        {captura ? <div className="p-field p-col-12 p-md-6"><label htmlFor="txtNumEmpleado">
                           {t('Empleados:label.id')}
                        </label>
                           {{ captura } ? (
                              <InputText name="num_empleado" id="txtNumEmpleado" placeholder={t('Empleados:placeholder.id')} value={Empleados.num_empleado} className={formik.errors.num_empleado ? 'p-invalid' : 'p-inputtext'} maxLength={45} onChange={(e) => updateProperty('num_empleado', e.target.value)}></InputText>
                           ) : (<label id="txtNumEmpleado">empleados.num_empleado</label>)}

                        </div>:<div></div>}
                        <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombreEmpleado">
                           {t('Empleados:label.nombre')}
                        </label>
                           {{ captura } ? (
                              <InputText id="txtNombreEmpleado" placeholder={t('Empleados:placeholder.nombre')} value={Empleados.nombre} className={formik.errors.txtNombreEmpleado ? 'p-invalid' : 'p-inputtext'} maxLength={45} onChange={(e) => updateProperty('nombre', e.target.value)}></InputText>
                           ) : (<label id="txtNombreEmpleado">empleados.nombreEmpleado</label>)}

                           {formik.errors.txtNombreEmpleado && <small id="txtNombreEmpleado-help" className="p-invalid">
                              {formik.errors.txtNombreEmpleado}
                           </small>}

                        </div>
                        <div className="p-field p-col-12 p-md-12"><label htmlFor="txtApellido">
                           {t('Empleados:label.apellido')}
                        </label>
                           {{ captura } ? (
                              <InputText id="txtApellido" placeholder={t('Empleados:placeholder.apellido')} value={Empleados.apellidos} className={formik.errors.apellidos ? 'p-invalid' : 'p-inputtext'} maxLength={45} onChange={(e) => updateProperty('apellidos', e.target.value)}></InputText>
                           ) : (<label id="txtApellido">empleados.apellidos</label>)}

                        </div>

                        <div className="p-field p-col-12 p-md-12"><label htmlFor="txtPuestoEmpleado">
                           {t('Empleados:label.puesto')}
                        </label>
                           {{ captura } ? (
                              <InputText id="txtPuestoEmpleado" placeholder={t('Empleados:placeholder.puesto')} value={Empleados.puesto} className={formik.errors.txtPuestoEmpleado ? 'p-invalid' : 'p-inputtext'} maxLength={45} onChange={(e) => updateProperty('puesto', e.target.value)}></InputText>
                           ) : (<label id="txtPuestoEmpleado">equipos.puesto</label>)}
                        </div>


                        <div className="p-field p-col-12 p-md-12"><label htmlFor="txtArea">
                           {t('Empleados:label.area')}
                        </label>
                           {{ captura } ? (
                              <InputText id="txtArea" placeholder={t('Empleados:placeholder.area')} value={Empleados.area} maxLength={45} onChange={(e) => updateProperty('area', e.target.value)}></InputText>
                           ) : (<label id="txtArea">empleados.area</label>)}

                        </div>
                        <div className="p-field p-col-12 p-md-12"><label htmlFor="txtEquipo">
                           {t('Empleados:label.equipo')}
                        </label>
                           {{ captura } ? (
                              <InputText id="txtEquipo" placeholder={t('Empleados:placeholder.equipo')} value={Empleados.id_equipo} className={formik.errors.id_equipo ? 'p-invalid' : 'p-inputtext'} maxLength={45} onChange={(e) => updateProperty('id_equipo', e.target.value)}></InputText>
                           ) : (<label id="txtEquipo">empleados.id_equipo</label>)}

                        </div>
                        <div className="p-field  p-col-12 p-md-12">
                           {dlgFooter}
                        </div>
                     </div>
                  </form>
               </div>
            }
         </Dialog>
      </div>
   );



}
export default Empleados;

