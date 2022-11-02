export default ({ IDL }) => {
    const File = IDL.Record({
      'data' : IDL.Vec(IDL.Vec(IDL.Nat8)),
      'ctype' : IDL.Text,
    });
    const Asset = IDL.Record({ 'name' : IDL.Text, 'payload' : File });
    const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Null });
    const Time = IDL.Int;
    const AccountIdentifier__1 = IDL.Text;
    const SubAccount = IDL.Vec(IDL.Nat8);
    const Account = IDL.Record({
      'owner' : IDL.Principal,
      'subaccount' : IDL.Opt(SubAccount),
    });
    const AccountIdentifier = IDL.Text;
    const User = IDL.Variant({
      'principal' : Account,
      'address' : AccountIdentifier,
    });
    const Balance = IDL.Nat;
    const Tokens = IDL.Nat;
    const Memo = IDL.Vec(IDL.Nat8);
    const Timestamp = IDL.Nat64;
    const Eimolad_ICRC1_Transfer = IDL.Record({
      'to' : User,
      'fee' : IDL.Opt(Tokens),
      'from' : User,
      'memo' : IDL.Opt(Memo),
      'created_at_time' : IDL.Opt(Timestamp),
      'amount' : Tokens,
    });
    const TxIndex = IDL.Nat;
    const TransferError = IDL.Variant({
      'GenericError' : IDL.Record({
        'message' : IDL.Text,
        'error_code' : IDL.Nat,
      }),
      'TemporarilyUnavailable' : IDL.Null,
      'BadBurn' : IDL.Record({ 'min_burn_amount' : Tokens }),
      'Duplicate' : IDL.Record({ 'duplicate_of' : TxIndex }),
      'BadFee' : IDL.Record({ 'expected_fee' : Tokens }),
      'CreatedInFuture' : IDL.Record({ 'ledger_time' : Timestamp }),
      'TooOld' : IDL.Null,
      'InsufficientFunds' : IDL.Record({ 'balance' : Tokens }),
    });
    const TransferResult = IDL.Variant({ 'Ok' : Tokens, 'Err' : TransferError });
    const Transfer = IDL.Record({
      'to' : User,
      'fee' : IDL.Opt(Tokens),
      'from' : User,
      'memo' : IDL.Opt(Memo),
      'created_at_time' : IDL.Opt(Timestamp),
      'amount' : Tokens,
    });
    const TxKind = IDL.Variant({
      'Burn' : IDL.Null,
      'Mint' : IDL.Null,
      'Transfer' : IDL.Null,
    });
    const Transaction = IDL.Record({
      'fee' : Tokens,
      'args' : Transfer,
      'kind' : TxKind,
      'timestamp' : Timestamp,
    });
    const CanisterMemorySize = IDL.Nat;
    const TransferId = IDL.Nat32;
    const TokenInfo = IDL.Record({
      'token_symbol' : IDL.Text,
      'token_canister' : IDL.Text,
      'CB_capacity' : IDL.Nat,
      'current_CB_value' : Balance,
      'token_standart' : IDL.Text,
      'min_CB_value' : IDL.Nat,
      'snsCanister' : IDL.Text,
      'royaltyWallet' : IDL.Text,
      'royalty' : IDL.Nat,
    });
    const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpRequest = IDL.Record({
      'url' : IDL.Text,
      'method' : IDL.Text,
      'body' : IDL.Vec(IDL.Nat8),
      'headers' : IDL.Vec(HeaderField),
    });
    const HttpStreamingCallbackToken = IDL.Record({
      'key' : IDL.Text,
      'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'index' : IDL.Nat,
      'content_encoding' : IDL.Text,
    });
    const HttpStreamingCallbackResponse = IDL.Record({
      'token' : IDL.Opt(HttpStreamingCallbackToken),
      'body' : IDL.Vec(IDL.Nat8),
    });
    const HttpStreamingStrategy = IDL.Variant({
      'Callback' : IDL.Record({
        'token' : HttpStreamingCallbackToken,
        'callback' : IDL.Func(
            [HttpStreamingCallbackToken],
            [HttpStreamingCallbackResponse],
            ['query'],
          ),
      }),
    });
    const HttpResponse = IDL.Record({
      'body' : IDL.Vec(IDL.Nat8),
      'headers' : IDL.Vec(HeaderField),
      'streaming_strategy' : IDL.Opt(HttpStreamingStrategy),
      'status_code' : IDL.Nat16,
    });
    const Subaccount = IDL.Vec(IDL.Nat8);
    const Account__1 = IDL.Record({
      'owner' : IDL.Principal,
      'subaccount' : IDL.Opt(Subaccount),
    });
    const Value = IDL.Variant({
      'Int' : IDL.Int,
      'Nat' : IDL.Nat,
      'Blob' : IDL.Vec(IDL.Nat8),
      'Text' : IDL.Text,
    });
    const ICRC1_Transfer = IDL.Record({
      'to' : Account__1,
      'fee' : IDL.Opt(Tokens),
      'memo' : IDL.Opt(Memo),
      'from_subaccount' : IDL.Opt(Subaccount),
      'created_at_time' : IDL.Opt(Timestamp),
      'amount' : Tokens,
    });
    return IDL.Service({
      'acceptCycles' : IDL.Func([], [], []),
      'addAsset' : IDL.Func([Asset], [IDL.Nat], []),
      'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
      'changeCapacity' : IDL.Func([IDL.Nat], [Result], []),
      'changeFeeCheckTime' : IDL.Func([Time], [Result], []),
      'changeFeeWallet' : IDL.Func([AccountIdentifier__1], [Result], []),
      'changeICRCfee' : IDL.Func([IDL.Nat], [Result], []),
      'changeMinCanisterSupply' : IDL.Func([IDL.Nat], [Result], []),
      'changeSum' : IDL.Func([IDL.Nat], [Result], []),
      'changefee' : IDL.Func([IDL.Nat], [Result], []),
      'eimolad_balance' : IDL.Func([User], [Balance], []),
      'eimolad_icrc1_transfer' : IDL.Func(
          [Eimolad_ICRC1_Transfer],
          [TransferResult],
          [],
        ),
      'findTransactions' : IDL.Func(
          [AccountIdentifier__1],
          [IDL.Vec(Transaction)],
          [],
        ),
      'getBalances' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(AccountIdentifier__1, Balance))],
          [],
        ),
      'getCanisterMemorySize' : IDL.Func([], [CanisterMemorySize], []),
      'getCapacity' : IDL.Func([], [IDL.Nat], []),
      'getCirculateBalance' : IDL.Func([], [IDL.Nat], []),
      'getFee' : IDL.Func([], [IDL.Nat], []),
      'getFeeCheckTime' : IDL.Func([], [Time], []),
      'getFeeWallet' : IDL.Func([], [AccountIdentifier__1], []),
      'getICRCTransactions' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TransferId, Transaction))],
          [],
        ),
      'getMinCanisterSupply' : IDL.Func([], [IDL.Nat], []),
      'getSum' : IDL.Func([], [IDL.Nat], []),
      'getTokenInfo' : IDL.Func([], [TokenInfo], []),
      'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
      'http_request_streaming_callback' : IDL.Func(
          [HttpStreamingCallbackToken],
          [HttpStreamingCallbackResponse],
          ['query'],
        ),
      'icrc1_balance_of' : IDL.Func([Account__1], [IDL.Nat], ['query']),
      'icrc1_decimals' : IDL.Func([], [IDL.Nat8], ['query']),
      'icrc1_fee' : IDL.Func([], [IDL.Nat], ['query']),
      'icrc1_metadata' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Text, Value))],
          ['query'],
        ),
      'icrc1_minting_account' : IDL.Func([], [IDL.Opt(Account__1)], ['query']),
      'icrc1_name' : IDL.Func([], [IDL.Text], ['query']),
      'icrc1_supported_standards' : IDL.Func(
          [],
          [IDL.Vec(IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text }))],
          ['query'],
        ),
      'icrc1_symbol' : IDL.Func([], [IDL.Text], ['query']),
      'icrc1_total_supply' : IDL.Func([], [Tokens], ['query']),
      'icrc1_transfer' : IDL.Func([ICRC1_Transfer], [TransferResult], []),
      'icrc_1_TransferToPrincipal' : IDL.Func(
          [IDL.Text, IDL.Nat],
          [TransferResult],
          [],
        ),
      'rewriteAsset' : IDL.Func([IDL.Text, Asset], [IDL.Opt(IDL.Nat)], []),
      'streamAsset' : IDL.Func([IDL.Nat, IDL.Bool, IDL.Vec(IDL.Nat8)], [], []),
      'transferFromCanister' : IDL.Func([User, IDL.Nat], [TransferResult], []),
    });
  };
  export const init = ({ IDL }) => { return []; };