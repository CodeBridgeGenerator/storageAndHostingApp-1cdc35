import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";


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

const ProjectgcpCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {authentication: false};
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
            projectId: _entity?.projectId,env: _entity?.env,gcpProjectId: _entity?.gcpProjectId,location: _entity?.location,imageUri: _entity?.imageUri,imageName: _entity?.imageName,authentication: _entity?.authentication || false,serviceAccount: _entity?.serviceAccount,memory: _entity?.memory,cpu: _entity?.cpu,concurrency: _entity?.concurrency,maxInstances: _entity?.maxInstances,minInstances: _entity?.minInstances,vpcConnector: _entity?.vpcConnector,vpcEgress: _entity?.vpcEgress,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("projectgcp").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Projectgcp created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Projectgcp" });
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
        <Dialog header="Create Projectgcp" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="projectgcp-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectId">Project ID:</label>
                <InputText id="projectId" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectId} onChange={(e) => setValByKey("projectId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectId"]) ? (
              <p className="m-0" key="error-projectId">
                {error["projectId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="env">env:</label>
                <InputText id="env" className="w-full mb-3 p-inputtext-sm" value={_entity?.env} onChange={(e) => setValByKey("env", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["env"]) ? (
              <p className="m-0" key="error-env">
                {error["env"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="gcpProjectId">GCP Project ID:</label>
                <InputText id="gcpProjectId" className="w-full mb-3 p-inputtext-sm" value={_entity?.gcpProjectId} onChange={(e) => setValByKey("gcpProjectId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["gcpProjectId"]) ? (
              <p className="m-0" key="error-gcpProjectId">
                {error["gcpProjectId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="location">Location:</label>
                <InputText id="location" className="w-full mb-3 p-inputtext-sm" value={_entity?.location} onChange={(e) => setValByKey("location", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["location"]) ? (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="imageUri">Image URI:</label>
                <InputText id="imageUri" className="w-full mb-3 p-inputtext-sm" value={_entity?.imageUri} onChange={(e) => setValByKey("imageUri", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["imageUri"]) ? (
              <p className="m-0" key="error-imageUri">
                {error["imageUri"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="imageName">Image Name:</label>
                <InputText id="imageName" className="w-full mb-3 p-inputtext-sm" value={_entity?.imageName} onChange={(e) => setValByKey("imageName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["imageName"]) ? (
              <p className="m-0" key="error-imageName">
                {error["imageName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="authentication">Authentication:</label>
                <Checkbox id="authentication" className="ml-3" checked={_entity?.authentication} onChange={(e) => setValByKey("authentication", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["authentication"]) ? (
              <p className="m-0" key="error-authentication">
                {error["authentication"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serviceAccount">Service Account:</label>
                <InputText id="serviceAccount" className="w-full mb-3 p-inputtext-sm" value={_entity?.serviceAccount} onChange={(e) => setValByKey("serviceAccount", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceAccount"]) ? (
              <p className="m-0" key="error-serviceAccount">
                {error["serviceAccount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="memory">Memory:</label>
                <InputText id="memory" className="w-full mb-3 p-inputtext-sm" value={_entity?.memory} onChange={(e) => setValByKey("memory", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["memory"]) ? (
              <p className="m-0" key="error-memory">
                {error["memory"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cpu">CPU:</label>
                <InputText id="cpu" className="w-full mb-3 p-inputtext-sm" value={_entity?.cpu} onChange={(e) => setValByKey("cpu", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cpu"]) ? (
              <p className="m-0" key="error-cpu">
                {error["cpu"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="concurrency">Concurrency:</label>
                <InputText id="concurrency" className="w-full mb-3 p-inputtext-sm" value={_entity?.concurrency} onChange={(e) => setValByKey("concurrency", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["concurrency"]) ? (
              <p className="m-0" key="error-concurrency">
                {error["concurrency"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="maxInstances">Max Instances:</label>
                <InputText id="maxInstances" className="w-full mb-3 p-inputtext-sm" value={_entity?.maxInstances} onChange={(e) => setValByKey("maxInstances", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["maxInstances"]) ? (
              <p className="m-0" key="error-maxInstances">
                {error["maxInstances"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="minInstances">Min Instances:</label>
                <InputText id="minInstances" className="w-full mb-3 p-inputtext-sm" value={_entity?.minInstances} onChange={(e) => setValByKey("minInstances", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["minInstances"]) ? (
              <p className="m-0" key="error-minInstances">
                {error["minInstances"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vpcConnector">VPC Connector:</label>
                <InputText id="vpcConnector" className="w-full mb-3 p-inputtext-sm" value={_entity?.vpcConnector} onChange={(e) => setValByKey("vpcConnector", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vpcConnector"]) ? (
              <p className="m-0" key="error-vpcConnector">
                {error["vpcConnector"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vpcEgress">VPC Egress:</label>
                <InputText id="vpcEgress" className="w-full mb-3 p-inputtext-sm" value={_entity?.vpcEgress} onChange={(e) => setValByKey("vpcEgress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vpcEgress"]) ? (
              <p className="m-0" key="error-vpcEgress">
                {error["vpcEgress"]}
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

export default connect(mapState, mapDispatch)(ProjectgcpCreateDialogComponent);
