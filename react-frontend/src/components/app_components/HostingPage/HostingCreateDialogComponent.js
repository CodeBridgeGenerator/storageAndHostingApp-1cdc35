import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const HostingCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            type: _entity?.type,storage: _entity?.storage,dataTransfer: _entity?.dataTransfer,domainSsl: _entity?.domainSsl,sitesPerProject: _entity?.sitesPerProject,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("hosting").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Hosting created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Hosting" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Hosting" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="hosting-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="type">Type:</label>
                <InputText id="type" className="w-full mb-3 p-inputtext-sm" value={_entity?.type} onChange={(e) => setValByKey("type", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["type"]) ? (
              <p className="m-0" key="error-type">
                {error["type"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="storage">Storage:</label>
                <InputText id="storage" className="w-full mb-3 p-inputtext-sm" value={_entity?.storage} onChange={(e) => setValByKey("storage", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["storage"]) ? (
              <p className="m-0" key="error-storage">
                {error["storage"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dataTransfer">Data transfer:</label>
                <InputText id="dataTransfer" className="w-full mb-3 p-inputtext-sm" value={_entity?.dataTransfer} onChange={(e) => setValByKey("dataTransfer", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dataTransfer"]) ? (
              <p className="m-0" key="error-dataTransfer">
                {error["dataTransfer"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="domainSsl">Domain & SSL:</label>
                <InputText id="domainSsl" className="w-full mb-3 p-inputtext-sm" value={_entity?.domainSsl} onChange={(e) => setValByKey("domainSsl", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["domainSsl"]) ? (
              <p className="m-0" key="error-domainSsl">
                {error["domainSsl"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sitesPerProject">Sites per project:</label>
                <InputText id="sitesPerProject" className="w-full mb-3 p-inputtext-sm" value={_entity?.sitesPerProject} onChange={(e) => setValByKey("sitesPerProject", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sitesPerProject"]) ? (
              <p className="m-0" key="error-sitesPerProject">
                {error["sitesPerProject"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(HostingCreateDialogComponent);
