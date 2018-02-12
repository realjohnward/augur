#!/usr/bin/env node

var Augur = require("../../src");
var debugOptions = require("../debug-options");
var getPrivateKeyFromString = require("../dp/lib/get-private-key").getPrivateKeyFromString;
var chalk = require("chalk");
var columnify = require("columnify");

var NetworkConfiguration = require("augur-core").NetworkConfiguration;
var getBalance = require("./get-balance");
var listMarkets  = require("./list-markets");
var designatedReport = require("./designated-report");
var initialReport = require("./initial-report");
var disputeContribute = require("./dispute-contribute");
var finalizeMarket = require("./finalize-market");
var pushTime = require("./push-time");

var commands = ["get-balance", "list-markets", "designate-report", "initial-report", "dispute", "finalize-market", "push-time"];
var NETWORKS = ["aura", "clique", "environment", "rinkeby", "ropsten"];
var methods = [getBalance, listMarkets, designatedReport, initialReport, disputeContribute, finalizeMarket, pushTime];

function runCommand(command, params, networks, callback) {
  console.log("networks", networks);
  console.log(chalk.yellow.dim("command"), command);
  console.log(chalk.yellow.dim("parameters"), params);
  console.log(chalk.yellow.dim("networks"), networks);
  networks.forEach(function (network) {
    console.log(NetworkConfiguration.create);
    var config = NetworkConfiguration.create(network);
    console.log(chalk.yellow("network http:"), config.http);
    var augur = new Augur();
    augur.rpc.setDebugOptions(debugOptions);
    var auth = getPrivateKeyFromString(config.privateKey);

    augur.connect({ ethereumNode: { http: config.http }, augurNode: process.env.AUGUR_WS }, function (err) {
      if (err) {
        console.log(chalk.red("Error "), chalk.red(err));
        return callback(err);
      }
      methods[commands.indexOf(command)](augur, params, auth, function (err) {
        if (err) console.log(chalk.red("Error "), chalk.red(err));
        console.log(chalk.green("Finished Execution"));
        process.exit(0);
      });
    });
  });
}

function parseArgs() {
  var args = {};
  var networks = [];
  process.argv.forEach(function (val) {
    if (NETWORKS.indexOf(val) !== -1) {
      networks.push(val);
    }
  });
  args.command = process.argv[2];
  args.networks = networks;
  args.params = process.argv[3];
  args.help = process.argv[3] === "help";
  console.log(JSON.stringify(args));
  return args;
}

function help() {

  console.log("                                  ");
  console.log("      Welcome to FLASH ......>    ");
  console.log("                                  ");
  console.log("Usage: flash <command> param1,param2,... network1,network2,...");

  console.log(chalk.underline("\nUsages"));
  console.log("Pushing Time on contracts is only possible if USE_NORMAL_TIME='false' environment variable was set when contracts were uploaded");

  console.log(chalk.underline("\nCommands"));
  console.log(commands.join(", "), "or help for this message");
  console.log("Run command help to get parameters needed, ie. initial-report help");

  console.log(chalk.underline("\nNetworks"));
  console.log(NETWORKS.join(", "));

  console.log(chalk.underline("\nConfiguration"));
  console.log("Set the same " + chalk.bold("environment variables") + " used in dp for deployment process");
  console.log("ex: ETHEREUM_PRIVATE_KEY=<owner priv key>");

  console.log(chalk.underline("\nNetwork (when using 'environment' for the network)"));
  console.log(columnify([{
    env: "ETHEREUM_HTTP",
    Description: "The http(s) address of your ethereum endpoint (default: http://localhost:8545)",
  }, {
    env: "ETHEREUM_PRIVATE_KEY",
    Description: "HEX Private Key of OWNER of contracts and used to move TIME on eth node",
  }, {
    env: "GAS_PRICE_IN_NANOETH",
    Description: "The transaction gas price to use, specified in nanoeth (default: varies)",
  }], {
    columnSplitter: " - ",
    minWidth: 20,
    maxWidth: 80,
    showHeaders: false,
  }));

  console.log(chalk.underline("\nPrivate Keys (for any named environment)"));
  console.log(columnify([{
    env: "AURA_PRIVATE_KEY",
    description: "Override key used to deploy to Aura, defaults to the dev key",
  }, {
    env: "CLIQUE_PRIVATE_KEY",
    description: "Override key used to deploy to Clique, defaults to the dev key",
  }, {
    env: "RINKEBY_PRIVATE_KEY",
    description: "Set key used to deploy to Rinkeby, default is blank and " + chalk.bold("will error if not set"),
  }, {
    env: "ROPSTEN_PRIVATE_KEY",
    description: "Set key used to deploy to Ropsten, default is blank and " + chalk.bold("will error if not set"),
  }], {
    columnSplitter: " - ",
    minWidth: 20,
    maxWidth: 80,
    showHeaders: false,
  }));

  console.log("               ");
  console.log(chalk.underline("\Method descriptions"));
  commands.forEach(function (command) {
    console.log(chalk.underline(command));
    methods[commands.indexOf(command)](null, "help", null, function () { });
    console.log("               ");
  });
}

if (require.main === module) {
  var command = process.argv[2];
  var args = parseArgs();
  if (commands.indexOf(command) === -1 || command === "help") {
    help();
    process.exit();
  }
  if (!args.help && (!args.networks || (args.networks.length === 0))) {
    console.log(chalk.red("Need a network"));
    help();
  } else {
    if (args.help) {
      // just run the command to get help
      methods[commands.indexOf(args.command)](null, "help", null, function () { });
      process.exit(0);
    }
    console.log("im here");
    runCommand(args.command, args.params, args.networks, function () {
      process.exit();
    });
  }
}
