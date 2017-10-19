import sys
import subprocess
import argparse
import json

def parseArguments():
    argumentParser = argparse.ArgumentParser(description='Diagnostics Collector Utility.')
    argumentParser.add_argument('--config', help='Configuration file')
    arguments = argumentParser.parse_args()

    configurationFilePath = arguments.config if (arguments.config is not None) else Constants.kConfigFile

    return configurationFilePath

def spawnProcess(processName, processArgs):
    subprocessArguments = processName
    for i in range(len(processArgs)):
        processArgument = processArgs[i]
        subprocessArguments += " " + str(processArgument)

    print "Spawning ", subprocessArguments
    subprocess.check_call(subprocessArguments, stdout=sys.stderr, stderr=subprocess.STDOUT, shell=True)

def parseJsonFile(filePath):
    with open(filePath) as jsonData:
            return json.load(jsonData)

class Constants(object):
    kConfigFile           = 'config.json'

    kEnable               = 'enabled'
    kOtherConfig          = 'other_config'
    kModules              = 'modules'
    kName                 = 'name'
    kType                 = 'type'
    kUser                 = 'user'
    kPassword             = 'password'
    kHostname             = 'hostname'
    kPath                 = 'path'
    kLogs                 = 'logs'
    kLogPaths             = 'log_paths'
    kDestinationDir       = 'destination_dir'
    kArchive              = 'archive'
    kRemoteCopy           = 'remote_copy'

    kDiagnosticsCollector = 'diagnostics_collector'
    kLogCollector         = 'log_collector'
    kMongoDump            = 'mongo_dump'

    kMongoDumpExec        = 'mongodump'
    kScpExec              = 'scp'
