"use strict";

const assert = require("chai").assert;
const setupTestDb = require("../../test.database");
const {getReportingFees} = require("../../../build/server/getters/get-reporting-fees");


describe("server/getters/get-reporting-fees", () => {
  const test = (t) => {
    it(t.description, (done) => {
      setupTestDb((dbErr, db) => {
        if (dbErr) assert.fail(dbErr);
        getReportingFees(db, t.params.augur, t.params.reporter, t.params.universe, t.params.feeWindow, (err, marketsMatched) => {
          t.assertions(err, marketsMatched);
          done();
        });
      });
    });
  };
  test({
    description: "Get reporting fees that exist in forked universe",
    params: {
      universe: "0x000000000000000000000000000000000000000b",
      reporter: "0x0000000000000000000000000000000000000b0b",
      augur: {
        contracts: {
          addresses: {
            974: {
              Cash: "CASH",
            },
          },
        },
        rpc: {
          getNetworkID: () => 974,
        },
      },
    },
    assertions: (err, marketsMatched) => {
      assert.isNull(err);
      assert.deepEqual(marketsMatched, {
        total: {
          "unclaimedEth": "107.87878787878787879",
          "unclaimedRepEarned": "114.5",
          "unclaimedRepStaked": "229",
          "lostRep": "0",
          "claimedEth": "4",
          "claimedRepStaked": "5",
          "claimedRepEarned": "6",
        },
        feeWindows: [
          "0x1000000000000000000000000000000000000000",
          "0x3000000000000000000000000000000000000000",
          "0x2100000000000000000000000000000000000000",
          "0x2000000000000000000000000000000000000000",
        ],
        forkedMarket: {},
        nonforkedMarkets: [
          {
            "address": "0x0000000000000000000000000000000000000019",
            "crowdsourcers": ["0x0000000000000000001000000000000000000003"],
            "crowdsourcersAreDisavowed": false,
            "initialReporterAddress": "0x0000000000000000000000000000000000abe111",
            "isFinalized": true,
            "isMigrated": true,
            "universeAddress": "0x000000000000000000000000000000000000000b",
          },
        ],
      });
    },
  });
  test({
    description: "get reporting fees for user that does not exist",
    params: {
      universe: "0x000000000000000000000000000000000000000b",
      reporter: "0x00000000000000000000000000000000000n0b0b",
      augur: {
        contracts: {
          addresses: {
            974: {
              Cash: "CASH",
            },
          },
        },
        rpc: {
          getNetworkID: () => 974,
        },
      },
    },
    assertions: (err, marketsMatched) => {
      assert.isNull(err);
      assert.deepEqual(marketsMatched, {
        total: {
          "unclaimedEth": "0",
          "unclaimedRepStaked": "0",
          "unclaimedRepEarned": "0",
          "lostRep": "0",
          "claimedEth": "4",
          "claimedRepStaked": "5",
          "claimedRepEarned": "6",
        },
        feeWindows: [
          "0x1000000000000000000000000000000000000000",
          "0x3000000000000000000000000000000000000000",
          "0x2100000000000000000000000000000000000000",
          "0x2000000000000000000000000000000000000000",
        ],
        forkedMarket: {},
        nonforkedMarkets: [
          {
            "address": "0x0000000000000000000000000000000000000019",
            "crowdsourcers": [],
            "crowdsourcersAreDisavowed": false,
            "initialReporterAddress": "0x0000000000000000000000000000000000abe111",
            "isFinalized": true,
            "isMigrated": true,
            "universeAddress": "0x000000000000000000000000000000000000000b",
          },
        ],
      });
    },
  });
  test({
    description: "get reporting fees for universe that does not exist",
    params: {
      universe: "0x000000000000000000000000000000000000n0n0",
      reporter: "0x0000000000000000000000000000000000000b0b",
      augur: {
        contracts: {
          addresses: {
            974: {
              Cash: "CASH",
            },
          },
        },
        rpc: {
          getNetworkID: () => 974,
        },
      },
    },
    assertions: (err, marketsMatched) => {
      assert.deepEqual(err, Error("Universe or feeWindow not found"));
      assert.equal(marketsMatched, null);
    },
  });
  test({
    description: "get reporting fees by feeWindow",
    params: {
      feeWindow: "0x1000000000000000000000000000000000000000",
      reporter: "0x0000000000000000000000000000000000000b0b",
      augur: {
        contracts: {
          addresses: {
            974: {
              Cash: "CASH",
            },
          },
        },
        rpc: {
          getNetworkID: () => 974,
        },
      },
    },
    assertions: (err, marketsMatched) => {
      assert.isNull(err);
      assert.deepEqual(marketsMatched, {
        total: {
          "unclaimedEth": "53.33333333333333333",
          "unclaimedRepEarned": "114.5",
          "unclaimedRepStaked": "229",
          "lostRep": "0",
          "claimedEth": "4",
          "claimedRepStaked": "5",
          "claimedRepEarned": "6",
        },
        feeWindows: [
          "0x1000000000000000000000000000000000000000",
        ],
        forkedMarket: {},
        nonforkedMarkets: [
          {
            "address": "0x0000000000000000000000000000000000000019",
            "crowdsourcers": ["0x0000000000000000001000000000000000000003"],
            "crowdsourcersAreDisavowed": false,
            "initialReporterAddress": "0x0000000000000000000000000000000000abe111",
            "isFinalized": true,
            "isMigrated": true,
            "universeAddress": "0x000000000000000000000000000000000000000b",
          },
        ],
      });
    },
  });
});
