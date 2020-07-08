import {create} from "../index";

interface CashierProtocol {
  payChannelConfig: any;
  version: "" | "v2";
}

const INIT_STATE: CashierProtocol = {
  payChannelConfig: {},
  version: "",
};

const model = {
  namespace: "cashierProtocol",
  state: {
    ...INIT_STATE,
  },
  reducers: {
    updateName(state, params: {payload: {name: string}}) {
      return {
        ...state,
        name: params.payload.name,
      };
    },
  },
  effects: {
    *authBySms(
      {payload}: {payload: {bankCardNo: string}},
      {put, call, select}
    ) {},
    *resendPaySms(
      {payload}: {payload: {phone: string; isPass: boolean}},
      {put, call, select}
    ) {},
  },
};

export default model;
const cashierProtocol = create(model);

test("测试生成的reducers", () => {
  expect(
    cashierProtocol.updateName({
      payload: {name: "laosiji"},
    })
  ).toEqual({
    type: "cashierProtocol/updateName",
    payload: {name: "laosiji"},
  });
});

test("测试生成的effects", () => {
  expect(
    cashierProtocol.authBySms({
      payload: {bankCardNo: "123"},
    })
  ).toEqual({
    type: "cashierProtocol/authBySms",
    payload: {bankCardNo: "123"},
  });
});

test("测试生成的effects", () => {
  expect(
    cashierProtocol.resendPaySms({payload: {phone: "132", isPass: true}})
  ).toEqual({
    type: "cashierProtocol/resendPaySms",
    payload: {phone: "132", isPass: true},
  });
});
