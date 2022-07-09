/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
  Form,
  Modal,
  Input,
  Radio,
  Button,
  DatePicker,
  InputNumber,
  notification,
} from "antd";

import moment from "moment";
import { useDispatch } from "react-redux";
import { isEmpty, isNumber } from "lodash";

import { Icon } from "@iconify/react";

import { randomString } from "src/helpers";
import { addNewBook, updateBook } from "src/store/bookSlice";

const ModalAddUpdateBook = ({ ...rest }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const _defaultValue = rest?.defaultValue || {};

  const [authors, setAuthors] = useState([]);

  /**
   * Set default value if is mode update
   */
  useEffect(() => {
    if (isEmpty(_defaultValue)) return;

    setAuthors(_defaultValue?.authors);
    form.setFieldsValue({
      ..._defaultValue,
      listPrice: _defaultValue?.price?.listPrice,
      retailPrice: _defaultValue?.price?.retailPrice,
      publishDate: moment(_defaultValue.publishDate),
    });
  }, [_defaultValue, form]);

  /**
   * Functions
   */
  const handleAddNewBook = (values) => {
    const _values = {
      ...values,
      authors,
      id: `new_${randomString(12)}`,
      etag: randomString(11),
      saleability: values?.saleability || "NOT_FOR_SALE",
      publishDate: moment(values?.publishDate).format("YYYY/MM/DD"),
      price: {
        listPrice: +values?.listPrice,
        retailPrice: +values?.retailPrice,
      },
    };

    setAuthors([]);
    rest?.onCancel();
    form.resetFields();

    notification.success({
      message: "Add new book successfully",
    });
    dispatch(addNewBook(_values));
  };

  const handleUpdateBook = (values) => {
    const _values = {
      ...values,
      authors,
      id: _defaultValue?.id,
      etag: _defaultValue?.etag,
      saleability: values?.saleability || "NOT_FOR_SALE",
      publishDate: moment(values?.publishDate).format("YYYY/MM/DD"),
      price: {
        listPrice: +values?.listPrice,
        retailPrice: +values?.retailPrice,
      },
    };

    setAuthors([]);
    rest?.onCancel();
    form.resetFields();

    notification.success({
      message: "Update a book successfully",
    });
    dispatch(updateBook(_values));
  };

  const handleAddNewAuthor = (e) => {
    const value = e?.target?.value;

    setAuthors((prev) => [...prev, value]);
  };

  const handleRemoveAuthor = (value) => {
    setAuthors((prev) => {
      const _indexAuthor = prev.findIndex((item) => item === value);

      return [...prev.slice(0, _indexAuthor), ...prev.slice(_indexAuthor + 1)];
    });
  };

  const handlePreventEnterForm = (e) => {
    if (e?.key === "Enter") e?.preventDefault();
  };

  /**
   * Views
   */
  return (
    <Modal {...rest} footer={false} className="modal-add-update-book">
      <div className="title">Add new book</div>

      <Form
        form={form}
        layout="vertical"
        onKeyDown={handlePreventEnterForm}
        onFinish={isEmpty(_defaultValue) ? handleAddNewBook : handleUpdateBook}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "title is required" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "description is required" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={5} />
        </Form.Item>

        <Form.Item name="subtitle" label="Subtitle">
          <Input placeholder="Enter subtitle" />
        </Form.Item>

        <Form.Item name="thumbnail" label="Thumbnail">
          <Input placeholder="Enter url thumbnail" />
        </Form.Item>

        <Form.Item name="authors" label="Authors">
          <Input
            placeholder="Enter authors"
            onPressEnter={handleAddNewAuthor}
          />

          <div className="authors">
            {authors.map((item, index) => (
              <div className="author-item" key={`author-item-${index}`}>
                <span>{item}</span>

                <Icon
                  icon="eva:close-fill"
                  onClick={() => handleRemoveAuthor(item)}
                />
              </div>
            ))}
          </div>
        </Form.Item>

        <Form.Item
          name="listPrice"
          label="List Price"
          rules={[
            {
              validator: async (_, value) => {
                if (!isNumber(+value) || isNaN(+value))
                  throw new Error("List price is number");
              },
            },
          ]}
        >
          <Input placeholder="Enter list price" />
        </Form.Item>

        <Form.Item
          name="retailPrice"
          label="Retail Price"
          rules={[
            {
              validator: async (_, value) => {
                if (!isNumber(+value) || isNaN(+value))
                  throw new Error("List price is number");
              },
            },
          ]}
        >
          <Input placeholder="Enter retail price" />
        </Form.Item>

        <Form.Item name="saleability" label="Sale">
          <Radio.Group defaultValue="NOT_FOR_SALE">
            <Radio value="FOR_SALE">Sale</Radio>
            <Radio value="NOT_FOR_SALE">Not sale</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="publisher" label="Publisher">
          <Input placeholder="Enter publisher" />
        </Form.Item>

        <Form.Item
          name="pageCount"
          label="Number of pages"
          rules={[{ required: true, message: "Number of pages is required" }]}
        >
          <InputNumber min={1} max={500} />
        </Form.Item>

        <Form.Item name="publishDate" label="Publish day">
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEmpty(_defaultValue) ? "Add" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddUpdateBook;
