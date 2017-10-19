from utils import *
from Modules import plugins

if __name__ == '__main__':
    configurationFilePath = parseArguments()
    config                = parseJsonFile(configurationFilePath)
    diagnosticsPlugin     = plugins.Loader.createPlugin(Constants.kDiagnosticsCollector, config[Constants.kDiagnosticsCollector])

    diagnosticsPlugin.dryRun()

    print 'All done!'
