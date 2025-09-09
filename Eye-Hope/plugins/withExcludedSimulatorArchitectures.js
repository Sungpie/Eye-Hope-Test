const { withPodfile } = require("expo/config-plugins");

const withExcludedSimulatorArchitectures = (config) => {
  return withPodfile(config, (config) => {
    // Podfile 내용을 가져옵니다.
    let podfile = config.modResults.contents;
    
    // 추가할 post_install 훅 스크립트
    const hook = `
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = 'arm64'
    end
  end
end`;

    // Podfile의 맨 끝(end 바로 위)에 훅을 추가합니다.
    // 이미 추가되어 있는지 확인하여 중복을 방지합니다.
    if (!podfile.includes("EXCLUDED_ARCHS[sdk=iphonesimulator*]")) {
      // "end" 라는 단어 바로 앞에 코드를 삽입합니다.
      podfile = podfile.replace(
        /^end/m,
        `${hook}\nend`
      );
      config.modResults.contents = podfile;
    }

    return config;
  });
};

module.exports = withExcludedSimulatorArchitectures;