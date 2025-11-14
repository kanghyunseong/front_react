import React from "react";
import * as S from "./UserRanking.styles";

const UserRanking = () => {
  // 이미지에 있는 더미 데이터
  const users = [
    {
      name: "Tiger Nixon",
      position: "System Architect",
      age: 61,
      savings: 30,
      start: "2011/04/25",
      end: "2011/04/25",
    },
    {
      name: "Garrett Winters",
      position: "Accountant",
      age: 63,
      savings: 60,
      start: "2011/07/25",
      end: "2011/07/25",
    },
    {
      name: "Ashton Cox",
      position: "Technical Author",
      age: 66,
      savings: 40,
      start: "2009/01/12",
      end: "2009/01/12",
    },
    {
      name: "Tiger Nixon",
      position: "Javascript Developer",
      age: 22,
      savings: 40,
      start: "2012/03/29",
      end: "2012/03/29",
    },
    {
      name: "Cedric Kelly",
      position: "Integration Specialist",
      age: 31,
      savings: 40,
      start: "2012/10/13",
      end: "2012/10/13",
    },
    {
      name: "Airi Satou",
      position: "Sales Assistant",
      age: 45,
      savings: 40,
      start: "2009/09/27",
      end: "2009/09/27",
    },
    {
      name: "Brielle Williamson",
      position: "Integration Specialist",
      age: 19,
      savings: 40,
      start: "2010/06/09",
      end: "2010/06/09",
    },
    {
      name: "Herrod Chandler",
      position: "Javascript Developer",
      age: 61,
      savings: 40,
      start: "2012/08/06",
      end: "2012/08/06",
    },
    {
      name: "Rhona Davidson",
      position: "Software Engineer",
      age: 59,
      savings: 40,
      start: "2010/10/14",
      end: "2010/10/14",
    },
  ];

  return (
    <S.Container>
      <S.TitleArea>
        <h2>Environments / User Ranking</h2>
      </S.TitleArea>

      <S.TableCard>
        <S.TableTitle>User Ranking</S.TableTitle>
        <S.TableDesc>Environments Ranking</S.TableDesc>

        <S.Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Age</th>
              <th>탄소 절감</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>{user.age}</td>
                <td>{user.savings}</td>
                <td>{user.start}</td>
                <td>{user.end}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableCard>
    </S.Container>
  );
};

export default UserRanking;
