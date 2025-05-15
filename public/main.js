const CalcForm = document.querySelector("#start-calc");
let InterestType = CalcForm.querySelector(".interest-box #type");
let UnitInput = CalcForm.querySelector(".unit-box #unit-input");
let UnitStandard = CalcForm.querySelector(".unit-box #unit");
let InterestRateInput = CalcForm.querySelector(
  ".interest-rate-box #interest-rate-input"
);
let InterestRateStandard = CalcForm.querySelector(
  ".interest-rate-box #interest-rate"
);
let Money = CalcForm.querySelector(".money-box #money");
let resultType = "";
const SubmitBtn = CalcForm.querySelector(".submit");

const McalcSimple = {
  McalcSimpleBasic: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * n);
    return s;
  },
  McalcSimpleYtoQ: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * 4 * n);
    return s;
  },
  McalcSimpleYtoM: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * 12 * n);
    return s;
  },
  McalcSimpleQtoY: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + (R / 4) * n);
    return s;
  },
  McalcSimpleQtoM: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * 3 * n);
    return s;
  },
  McalcSimpleMtoY: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + (R / 12) * n);
    return s;
  },
  McalcSimpleMtoQ: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + (R / 3) * n);
    return s;
  },
};

const McalcCompound = {
  McalcCompoundYtoY: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** t;
    return s;
  },
  McalcCompoundYtoQ: function (A, r, t) {
    let R = 0.01 * r;
    let EAR = (1 + R) ** 4 - 1;
    let s = A * (1 + EAR) ** t;
    return s;
  },
  McalcCompoundYtoM: function (A, r, t) {
    let R = 0.01 * r;
    let EAR = (1 + R) ** 12 - 1;
    let s = A * (1 + EAR) ** t;
    return s;
  },
  McalcCompoundQtoY: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R / 4) ** t;
    return s;
  },
  McalcCompoundQtoQ: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** t;
    return s;
  },
  McalcCompoundQtoM: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R * 3) ** t;
    return s;
  },
  McalcCompoundMtoY: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R / 12) ** t;
    return s;
  },
  McalcCompoundMtoM: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** t;
    return s;
  },
  McalcCompoundMtoQ: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R / 3) ** t;
    return s;
  },
};
SubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // 사용자가 입력/선택한 값들을 변수에 저장
  const selectedInterestType = CalcForm.querySelector(
    ".interest-box #type"
  ).value;
  // 새로 추가된 복리 계산 주기 선택 값 가져오기
  const selectedCompoundingPeriod = CalcForm.querySelector(
    "#compounding-period"
  ).value;

  const selectedUnitInput = CalcForm.querySelector(
    ".unit-box #unit-input"
  ).value; // 기간 숫자
  const selectedUnitStandard = CalcForm.querySelector(".unit-box #unit").value; // 기간 단위
  const inputInterestRate = CalcForm.querySelector(
    ".interest-rate-box #interest-rate-input"
  ).value; // 이율 숫자
  const selectedInterestRateStandard = CalcForm.querySelector(
    ".interest-rate-box #interest-rate"
  ).value; // 이율 단위
  const inputMoney = CalcForm.querySelector(".money-box #money").value; // 원금

  // ⭐ 기간 계산 결과 저장 변수를 calcDuration으로 통일! ⭐
  let calcDuration = 0; // 계산에 사용할 최종 기간 변수 초기화

  // 1. 사용자가 선택한 유형(단리/복리)에 따라 resultType 결정 및 기간 변환
  if (selectedInterestType === "Simple") {
    // 단리는 복리 주기 선택과 상관 없이 기간 단위와 이율 단위로 함수 결정
    if (selectedUnitStandard === "Y") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "SimpleBasic";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "SimpleYtoQ";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "SimpleYtoM";
      }
    } else if (selectedUnitStandard === "Q") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "SimpleQtoY";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "SimpleBasic";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "SimpleQtoM";
      }
    } else if (selectedUnitStandard === "M") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "SimpleMtoY";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "SimpleMtoQ";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "SimpleBasic";
      }
    }
    // 단리 계산에서는 입력된 기간 숫자 그대로 calcDuration에 저장
    calcDuration = Number(selectedUnitInput);
  } else if (selectedInterestType === "Compound") {
    // ⭐ 복리일 경우: 선택된 복리 주기와 이율 단위로 함수 결정!
    let compoundingPeriodCode = "";
    if (selectedCompoundingPeriod === "Yearly") compoundingPeriodCode = "Y";
    else if (selectedCompoundingPeriod === "Quarterly")
      compoundingPeriodCode = "Q";
    else if (selectedCompoundingPeriod === "Monthly")
      compoundingPeriodCode = "M";
    // TODO: 만약 일 복리 등을 추가한다면 여기에 해당 로직 추가

    if (!compoundingPeriodCode) {
      // 복리 주기 선택이 유효하지 않으면
      resultType = "fail";
    } else {
      // 함수 이름 조합: Compound + [복리 주기 코드] + to + [이율 단위]
      resultType =
        "Compound" +
        compoundingPeriodCode +
        "to" +
        selectedInterestRateStandard;

      // ⭐ 복리 계산에 사용할 기간 숫자를 '복리 계산 주기' 단위로 변환하여 calcDuration에 저장!
      const inputDurationStandard = selectedUnitStandard; // 사용자가 입력한 기간 단위 (Y, Q, M)
      const targetDurationStandard = compoundingPeriodCode; // 변환하려는 목표 단위 (복리 주기 단위 Y, Q, M)

      let durationInInputUnit = Number(selectedUnitInput); // 사용자가 입력한 기간 숫자

      if (targetDurationStandard === inputDurationStandard) {
        calcDuration = durationInInputUnit; // 단위 같으면 그대로 calcDuration에 저장
      } else if (
        targetDurationStandard === "Y" &&
        inputDurationStandard === "Q"
      ) {
        calcDuration = durationInInputUnit / 4; // 분기를 년으로 변환해서 calcDuration에 저장
      } else if (
        targetDurationStandard === "Y" &&
        inputDurationStandard === "M"
      ) {
        calcDuration = durationInInputUnit / 12; // 개월을 년으로 변환해서 calcDuration에 저장
      } else if (
        targetDurationStandard === "Q" &&
        inputDurationStandard === "Y"
      ) {
        calcDuration = durationInInputUnit * 4; // 년을 분기로 변환해서 calcDuration에 저장
      } else if (
        targetDurationStandard === "Q" &&
        inputDurationStandard === "M"
      ) {
        calcDuration = durationInInputUnit / 3; // 개월을 분기로 변환해서 calcDuration에 저장
      } else if (
        targetDurationStandard === "M" &&
        inputDurationStandard === "Y"
      ) {
        calcDuration = durationInInputUnit * 12; // 년을 개월로 변환해서 calcDuration에 저장
      } else if (
        targetDurationStandard === "M" &&
        inputDurationStandard === "Q"
      ) {
        calcDuration = durationInInputUnit * 3; // 분기를 개월로 변환해서 calcDuration에 저장
      } else {
        // 예상치 못한 기간 단위 조합이라면? (일단 fail로 처리)
        resultType = "fail";
        console.error(
          `Unexpected duration unit conversion: from ${inputDurationStandard} to ${targetDurationStandard}`
        );
      }
      // TODO: 1년 미만 기간의 연복리 처리 (소수 지수)는 McalcCompoundYtoY 함수 내부에서 알아서 처리됨.
      // 만약 1년 미만일 때 단리처럼 계산하고 싶다면 여기에 추가 로직 필요. (보통은 복리는 소수 지수 계산)
    }
  } else {
    // Simple, Compound 아닌 다른 InterestType (이런 경우는 없겠지만)
    resultType = "fail";
  }

  // 디버깅을 위해 선택된 정보와 결정된 resultType, 계산에 사용할 기간 출력
  console.log("선택된 정보:", {
    InterestType: selectedInterestType,
    CompoundingPeriod: selectedCompoundingPeriod, // 새 정보 추가
    UnitInput: selectedUnitInput, // 사용자가 입력한 그대로의 기간 숫자
    UnitStandard: selectedUnitStandard, // 사용자가 선택한 기간 단위
    InterestRateStandard: selectedInterestRateStandard,
    InterestRateInput: inputInterestRate,
    Money: inputMoney,
    ResultType: resultType,
    CalculatedDuration_for_CalcFunction: calcDuration, // ⭐ 계산 함수에 전달될 최종 기간 값 (이름 변경됨!)
  });

  let result; // 계산 결과 (원리 합계)를 저장할 변수

  // 2. resultType이 유효하면 계산 수행
  if (resultType && resultType !== "fail") {
    try {
      if (selectedInterestType === "Simple") {
        const functionName = "Mcalc" + resultType;
        if (McalcSimple[functionName]) {
          result = McalcSimple[functionName](
            Number(inputMoney), // 원금 (숫자)
            Number(inputInterestRate), // 이율 (숫자)
            calcDuration // ⭐ 단리 계산 시에도 calcDuration 사용
          );
        } else {
          console.error(
            "Error: 해당하는 Simple 계산 함수를 찾을 수 없습니다:",
            functionName
          );
          alert("계산 중 내부 오류가 발생했습니다. (Simple)");
          return;
        }
      } else if (selectedInterestType === "Compound") {
        const functionName = "Mcalc" + resultType; // resultType은 이미 "CompoundYtoY" 형태
        if (McalcCompound[functionName]) {
          result = McalcCompound[functionName](
            Number(inputMoney), // 원금 (숫자)
            Number(inputInterestRate), // 이율 (숫자)
            calcDuration // ⭐ 복리 계산 시에도 calcDuration 사용!
          );
        } else {
          console.error(
            "Error: 해당하는 Compound 계산 함수를 찾을 수 없습니다:",
            functionName
          );
          alert("계산 중 내부 오류가 발생했습니다. (Compound)");
          return;
        }
      }

      // ⭐⭐⭐ 계산 결과 표시 부분 수정 ⭐⭐⭐
      // result 변수에는 계산된 원리 합계(숫자)가 들어있음
      if (result !== undefined && !isNaN(result)) {
        // result가 undefined나 NaN이 아닐 때만 표시
        console.log("계산 결과 (원리 합계):", result);

        const resultElement = document.querySelector(".result-text"); // 원리 합계 표시 요소
        const resultElement2 = document.querySelector(".result-text2"); // 이자 표시 요소

        // 원리 합계 표시
        if (resultElement) {
          resultElement.textContent = "원리 합계: " + result.toFixed(2) + "원"; // 소수점 둘째 자리까지 표시
        } else {
          console.warn("결과를 표시할 .result-text 요소를 찾을 수 없습니다.");
        }

        // 이자 계산 및 표시
        const inputMoneyNumber = Number(inputMoney); // 원금도 숫자로 변환해두자
        // ⭐ 이자 계산: 원리 합계 (result) - 원금 (inputMoneyNumber)
        const interestAmount = result - inputMoneyNumber;

        if (interestAmount !== undefined && !isNaN(interestAmount)) {
          // 이자 금액도 유효할 때만 표시
          if (resultElement2) {
            resultElement2.textContent =
              "총 이자: " + interestAmount.toFixed(2) + "원"; // 이자도 소수점 둘째 자리까지 표시
          } else {
            console.warn(
              "결과를 표시할 .result-text2 요소를 찾을 수 없습니다."
            );
          }
        } else {
          console.error(
            "Error: 이자 계산 결과가 유효하지 않습니다:",
            interestAmount
          );
          if (resultElement2) {
            // 이자 금액이 유효하지 않으면 이자 칸은 비워두거나 에러 표시
            resultElement2.textContent = "총 이자: 계산 불가";
          }
        }
      } else {
        // 계산 결과가 유효하지 않은 경우 (result가 undefined 또는 NaN이라면)
        console.error("Error: 계산 결과가 유효하지 않습니다:", result); // 어떤 값이 들어왔는지 로그에 찍어보자
        alert("계산 처리 중 예상치 못한 오류가 발생했습니다.");
      }
      // ⭐⭐⭐ 계산 결과 표시 부분 수정 끝 ⭐⭐⭐
    } catch (e) {
      console.error("계산 중 예외 발생:", e);
      alert("계산 처리 중 오류가 발생했습니다.");
    }
  } else {
    alert("지원하지 않는 계산 방식입니다.");
  }
});
