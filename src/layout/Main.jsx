import React, { Component, useState, useEffect } from "react";
import { Modal, Button, Input, notification, Spin } from "antd";

import TableList from "../components/Table/TableList";
import "./index.css";
export default function Main() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [newContact, setNewContact] = useState({
    id: null,
    firstname: null,
    surname: null,
    phonebook: {
      work: null,
      home: null,
      cellphone: null,
    },
  });
  const saveOnStorage = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };
  const getFromStorage = async () => {
    var dataFromStorage = await localStorage.getItem("data");
    var dataParsed = JSON.parse(dataFromStorage);
    if (dataParsed != null) {
      setData(dataParsed);
    } else {
      setData([]);
    }

    setTimeout(() => {
      setLoading(false);
    }, 350);
  };
  useEffect(() => {
    getFromStorage();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };
  const editData = (id, property, value) => {
    var stateData = [...data];
    var obj = stateData.find((el) => el.id == id);
    var index = stateData.findIndex((el) => el.id == id);
    if (property == "work" || property == "home" || property == "cellphone") {
      obj.phonebook[property] = value;
      stateData[index] = obj;
      setData(stateData);
      saveOnStorage(stateData);
    } else {
      obj[property] = value;
      stateData[index] = obj;
      setData(stateData);
      saveOnStorage(stateData);
    }
  };
  const deleteData = (id) => {
    var stateData = [...data];
    var index = stateData.findIndex((el) => el.id == id);
    stateData.splice(index, 1);
    setData(stateData);
    notification.success({
      message: "Delete Successfully",
      description: "Contact is deleted",
    });
    saveOnStorage(stateData);
  };
  const addNew = () => {
    if (newContact.firstname && newContact.surname) {
      var stateData;

      if (data == []) {
        stateData = data;
      } else {
        stateData = [...data];
      }
      stateData.push(newContact);
      setData(stateData);
      setNewContact({
        id: null,
        firstname: null,
        surname: null,
        phonebook: {
          work: null,
          home: null,
          cellphone: null,
        },
      });
      notification.success({
        message: "Success!",
        description: "New Contact Added Successfully",
      });
      saveOnStorage(stateData);
      toggleModal();
    } else {
      notification.error({
        message: "Error",
        description: "Please Fill Name And Last Name",
      });
    }
  };
  const updateNewContact = (property, value) => {
    var stateData = { ...newContact };
    if (property == "work" || property == "home" || property == "cellphone") {
      stateData.phonebook[property] = value;
      setNewContact(stateData);
    } else {
      stateData.id = Math.random().toString(36).substr(2, 9);
      stateData[property] = value;
      setNewContact(stateData);
    }
  };

  return (
    <div>
      <Spin spinning={loading}>
        <TableList data={data} editData={editData} deleteData={deleteData} />
      </Spin>
      <Button type="primary" onClick={toggleModal}>
        Add New Contact
      </Button>
      <Modal
        title="Add New Contact"
        visible={modal}
        onOk={addNew}
        onCancel={toggleModal}
      >
        <div className={"row"}>
          <div className="half_row">
            <p>First Name</p>
            <Input
              placeholder={"First Name"}
              value={newContact.firstname ? newContact.firstname : ""}
              onChange={(e) => {
                updateNewContact("firstname", e.target.value);
              }}
            />
          </div>
          <div className="half_row">
            <p>Last Name</p>
            <Input
              placeholder={"Last Name"}
              value={newContact.surname ? newContact.surname : ""}
              onChange={(e) => {
                updateNewContact("surname", e.target.value);
              }}
            />
          </div>
        </div>
        <div className={"row"}>
          <div className="a_third_row">
            <p>Work Phone</p>
            <Input
              placeholder={"Work Phone"}
              value={newContact.phonebook.work ? newContact.phonebook.work : ""}
              onChange={(e) => {
                if (e.target.value.match(/^-?\d*\.?\d*$/))
                  updateNewContact("work", e.target.value);
              }}
            />
          </div>
          <div className="a_third_row">
            <p>Home Phone</p>
            <Input
              placeholder={"Home Phone"}
              value={newContact.phonebook.home ? newContact.phonebook.home : ""}
              onChange={(e) => {
                if (e.target.value.match(/^-?\d*\.?\d*$/))
                  updateNewContact("home", e.target.value);
              }}
            />
          </div>
          <div className="a_third_row">
            <p>CellPhone</p>
            <Input
              placeholder={"CellPhone"}
              value={
                newContact.phonebook.cellphone
                  ? newContact.phonebook.cellphone
                  : ""
              }
              onChange={(e) => {
                if (e.target.value.match(/^-?\d*\.?\d*$/))
                  updateNewContact("cellphone", e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
