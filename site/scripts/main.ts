import { Walkthrough } from '../../src/walkthrough';
import { TutorialStage } from '../../src/interface';

(function () {
    window.addEventListener('DOMContentLoaded', (event) => {

        document.getElementById('start').addEventListener('click', () => {

            const wt = new Walkthrough();

            let steps = [] as Array<TutorialStage>;

            steps.push({
                title: 'example',
                desc: 'Learn how to create a Walkthrough instance and set the TutorialStage array.',
                selector: '#Example',
                fixPadding: true
            });

            steps.push({
                title: 'TutorialOptions class',
                desc: 'TutorialOptions is an optional paameter of the setTutorial function.',
                selector: '#TutorialOptions',
                fixPadding: true
            });

            steps.push({
                title: 'TutorialStage interface',
                desc: 'Where calling setTutorial you should provide a TutorialStage array.',
                selector: '#TutorialStage',
                fixPadding: true
            });

            steps.push({
                title: 'Best Practices',
                desc: 'In case you want to customize the behaviour of fix position issues you should read this section.',
                selector: '#BestPractices',
                fixPadding: true
            });

            steps.push({
                title: 'Installation',
                desc: 'Use npm to easily install this library.',
                selector: '#Installation',
                fixPadding: true
            });

            wt.setTutorial(steps).subscribe(
                () => {
                    // alert('Walkthrough Done!');
                    console.log('Walkthrough Done!');
                }
            );
        }, false);
    });
})();