import { Table, Typography, Image, Row, Col } from "antd";
import React from "react";
import { useGetCriptosQuery } from "../services/criptoApi";

const DatesTable = () => {
  const { data } = useGetCriptosQuery(55);
  const dataSource = data?.data?.coins.map((el: any) => ({
    ...el,
    key: el.id,
  }));

  const inData =
    "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue&experiments.theme=dark";
  function queryObjectify(str: string) {
    return str
      .split("&")
      .map((el) => el.split("=").map(decodeURIComponent))
      .reduce((obj: any, [k, v]) => {
        const fragment = k.split(".");
        let curPath = obj;
        fragment.forEach((p, i) => {
          if (!(p in curPath)) {
            curPath[p] = i === fragment.length - 1 ? v : {};
          }
          curPath = curPath[p];
        });
        return obj;
      }, {});
  }

  console.log(JSON.stringify(queryObjectify(inData), undefined, "  "));

  const columns = [
    {
      title: "iconUrl",
      dataIndex: "iconUrl",
      key: "iconUrl",
      width: 100,
      fixed: "left" as const,
      render: (iconUrl: string) => <Image src={iconUrl} width={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Typography.Text copyable>{text}</Typography.Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: "symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "websiteUrl",
      dataIndex: "websiteUrl",
      key: "websiteUrl",
      render: (websiteUrl: string) => (
        <Typography.Link href={websiteUrl} target="_blank">
          <Typography.Text type="success">
            {websiteUrl ? websiteUrl : "---"}
          </Typography.Text>
        </Typography.Link>
      ),
    },
    {
      title: "rank",
      dataIndex: "rank",
      key: "rank",
    },
  ];
  return (
    <Row>
      <Col xs={24} md={{ span: 12, offset: 6 }}>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1300 }} />
      </Col>
    </Row>
  );
};

export default DatesTable;
