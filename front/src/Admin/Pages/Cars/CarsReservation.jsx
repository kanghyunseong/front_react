import React from "react";
import * as S from "./CarsReservation.styles";

const CarsReservation = () => {
  const reservations = [
    {
      customer: "이름",
      car: "A1",
      userId: "#10421",
      phone: "243598234",
      start: "12 Jan, 2023",
      end: "12 Jan, 2023",
    },
    {
      customer: "이름",
      car: "B1",
      userId: "#10422",
      phone: "877712",
      start: "12 Jan, 2023",
      end: "13 Jan, 2023",
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#6B4CE6" }}>
        Reservation List
      </h2>
      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Cars</th>
              <th>UserId</th>
              <th>Phone</th>
              <th>StartDate</th>
              <th>EndDate</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, index) => (
              <tr key={index}>
                <td>
                  <S.CustomerName>{res.customer}</S.CustomerName>
                  <S.CustomerSub>khacademy</S.CustomerSub>
                </td>
                <td>{res.car}</td>
                <td>{res.userId}</td>
                <td>{res.phone}</td>
                <td>{res.start}</td>
                <td>{res.end}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableContainer>
    </div>
  );
};

export default CarsReservation;
