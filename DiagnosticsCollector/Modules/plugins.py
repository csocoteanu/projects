from utils import *

from Modules import DiagnosticsCollector
from Modules import LogCollector
from Modules import MongoDump

class Loader(object):
    plugins = {
        Constants.kDiagnosticsCollector: DiagnosticsCollector.DiagnosticsCollector,
        Constants.kLogCollector:         LogCollector.LogCollector,
        Constants.kMongoDump:            MongoDump.MongoDump
    }

    @staticmethod
    def createPlugin(pluginName, pluginConfig):
        type = Loader.plugins[pluginName]
        return type(pluginConfig)