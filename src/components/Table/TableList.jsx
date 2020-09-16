import React, { Component, useState } from "react";
import { Table, Input, notification } from "antd";
import "./TableList.css";

export default function TableList(props) {
  const [editable, setEditable] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  var columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      render: (data, obj, index) => {
        if (index == editedIndex && editable) {
          return (
            <Input
              placeholder={"First Name"}
              value={data}
              onChange={(e) => {
                props.editData(obj.id, "firstname", e.target.value);
              }}
            />
          );
        } else {
          return <p>{data}</p>;
        }
      },
    },
    {
      title: "Last Name",
      dataIndex: "surname",
      key: "surname",
      render: (data, obj, index) => {
        if (index == editedIndex && editable) {
          return (
            <Input
              placeholder={"Last Name"}
              value={data}
              onChange={(e) => {
                props.editData(obj.id, "surname", e.target.value);
              }}
            />
          );
        } else {
          return <p>{data}</p>;
        }
      },
    },
    {
      title: "Work Phone",
      dataIndex: "phonebook",
      key: "workphone",
      render: (data, obj, index) => {
        if (index == editedIndex && editable) {
          return (
            <Input
              placeholder={"Workphone"}
              value={data.work}
              onChange={(e) => {
                if (e.target.value.match(/^-?\d*\.?\d*$/))
                  props.editData(obj.id, "work", e.target.value);
              }}
            />
          );
        } else {
          return <p>{data.work ? data.work : "-"}</p>;
        }
      },
    },
    {
      title: "Home Phone",
      dataIndex: "phonebook",
      key: "homephone",
      render: (data, obj, index) => {
        if (index == editedIndex && editable) {
          return (
            <Input
              placeholder={"Home Phone"}
              value={data.home}
              onChange={(e) => {
                if (e.target.value.match(/^-?\d*\.?\d*$/))
                  props.editData(obj.id, "home", e.target.value);
              }}
            />
          );
        } else {
          return <p>{data.home ? data.home : "-"}</p>;
        }
      },
    },
    {
      title: "CellPhone",
      dataIndex: "phonebook",
      key: "cellphone",
      render: (data, obj, index) => {
        if (index == editedIndex && editable) {
          return (
            <Input
              placeholder={"Cellphone"}
              value={data.cellphone}
              onChange={(e) => {
                if (e.target.value.match(/^-?\d*\.?\d*$/))
                  props.editData(obj.id, "cellphone", e.target.value);
              }}
            />
          );
        } else {
          return <p>{data.cellphone ? data.cellphone : "-"}</p>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (data, object, index) => (
        <>
          <a
            onClick={() =>
              editable && index == editedIndex ? save(index) : editMode(index)
            }
          >
            {editable && index == editedIndex ? "Save" : "Edit"}
          </a>
          &nbsp;&nbsp;&nbsp;
          <a
            onClick={() => {
              props.deleteData(object.id);
            }}
            className={"delete"}
          >
            Delete
          </a>
        </>
      ),
    },
  ];
  const editMode = (index) => {
    setEditable(true);
    setEditedIndex(index);
  };
  const save = (index) => {
    notification.success({
      message: "Success!",
      description: "Contact Edited Successfully!",
    });
    setEditable(false);
    setEditedIndex(null);
  };
  return <Table dataSource={props.data} columns={columns} />;
}
